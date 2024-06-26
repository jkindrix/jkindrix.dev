---
title: "Chapter 5 Utilizing Viewmodels For Database Operations"
---

## Chapter 5: Utilizing ViewModels for Database Operations

### Section 6: Practical Examples

#### 6.1 Example: Task Management Application

**Step-by-step guide to implementing a task management app**

In this section, we will build a task management application using ViewModel, Room, and Jetpack Compose. The app will allow users to add, update, delete, and view tasks.

1. **Set Up Dependencies**

   Ensure you have the necessary dependencies in your `build.gradle` file.

   ```groovy
   plugins {
       id 'com.android.application'
       id 'org.jetbrains.kotlin.android'
       id 'kotlin-kapt'
       id 'dagger.hilt.android.plugin'
   }

   android {
       compileSdkVersion 30
       defaultConfig {
           applicationId "com.example.taskmanagement"
           minSdkVersion 21
           targetSdkVersion 30
           versionCode 1
           versionName "1.0"
       }

       buildFeatures {
           compose true
       }

       composeOptions {
           kotlinCompilerExtensionVersion "1.0.5"
       }

       kotlinOptions {
           jvmTarget = '1.8'
       }

       compileOptions {
           sourceCompatibility JavaVersion.VERSION_1_8
           targetCompatibility JavaVersion.VERSION_1_8
       }
   }

   dependencies {
       implementation "androidx.core:core-ktx:1.6.0"
       implementation "androidx.appcompat:appcompat:1.3.1"
       implementation "com.google.android.material:material:1.4.0"
       implementation "androidx.compose.ui:ui:1.0.5"
       implementation "androidx.compose.material:material:1.0.5"
       implementation "androidx.compose.ui:ui-tooling-preview:1.0.5"
       implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.3.1"
       implementation "androidx.activity:activity-compose:1.3.1"
       implementation "androidx.hilt:hilt-navigation-compose:1.0.0-alpha03"

       // Room dependencies
       implementation "androidx.room:room-runtime:2.4.1"
       kapt "androidx.room:room-compiler:2.4.1"
       implementation "androidx.room:room-ktx:2.4.1"

       // Hilt dependencies
       implementation "com.google.dagger:hilt-android:2.38.1"
       kapt "com.google.dagger:hilt-android-compiler:2.38.1"

       debugImplementation "androidx.compose.ui:ui-tooling:1.0.5"
       debugImplementation "androidx.compose.ui:ui-test-manifest:1.0.5"
   }

   kapt {
       correctErrorTypes = true
   }
   ```

2. **Define Entities and DAOs**

   Create a `Task` entity and `TaskDao` interface.

   ```kotlin
   @Entity(tableName = "tasks")
   data class Task(
       @PrimaryKey(autoGenerate = true) val id: Int = 0,
       val title: String,
       val description: String
   )

   @Dao
   interface TaskDao {
       @Query("SELECT * FROM tasks")
       fun getAllTasks(): LiveData<List<Task>>

       @Insert
       suspend fun insert(task: Task)

       @Update
       suspend fun update(task: Task)

       @Delete
       suspend fun delete(task: Task)
   }
   ```

3. **Create Database Class**

   Define the `AppDatabase` class.

   ```kotlin
   @Database(entities = [Task::class], version = 1)
   abstract class AppDatabase : RoomDatabase() {
       abstract fun taskDao(): TaskDao
   }
   ```

4. **Set Up Dependency Injection**

   Use Hilt to provide the database and DAO instances.

   ```kotlin
   @HiltAndroidApp
   class MyApp : Application()

   @Module
   @InstallIn(SingletonComponent::class)
   object DatabaseModule {
       @Provides
       @Singleton
       fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
           return Room.databaseBuilder(
               context,
               AppDatabase::class.java,
               "task_database"
           ).build()
       }

       @Provides
       fun provideTaskDao(database: AppDatabase): TaskDao {
           return database.taskDao()
       }
   }
   ```

5. **Create ViewModel**

   Implement the `TaskViewModel` to handle UI-related data.

   ```kotlin
   @HiltViewModel
   class TaskViewModel @Inject constructor(private val taskDao: TaskDao) : ViewModel() {
       val tasks: LiveData<List<Task>> = taskDao.getAllTasks()

       fun addTask(title: String, description: String) {
           viewModelScope.launch {
               taskDao.insert(Task(title = title, description = description))
           }
       }

       fun updateTask(task: Task) {
           viewModelScope.launch {
               taskDao.update(task)
           }
       }

       fun deleteTask(task: Task) {
           viewModelScope.launch {
               taskDao.delete(task)
           }
       }
   }
   ```

6. **Compose UI**

   Create Compose UI components to display and manage tasks.

   ```kotlin
   @Composable
   fun TaskListScreen(viewModel: TaskViewModel = hiltViewModel()) {
       val tasks by viewModel.tasks.observeAsState(initial = emptyList())

       Column {
           TaskInputForm(onSave = { title, description -> viewModel.addTask(title, description) })
           LazyColumn {
               items(tasks) { task ->
                   TaskListItem(
                       task = task,
                       onUpdate = { viewModel.updateTask(it) },
                       onDelete = { viewModel.deleteTask(it) }
                   )
               }
           }
       }
   }

   @Composable
   fun TaskInputForm(onSave: (String, String) -> Unit) {
       var title by remember { mutableStateOf("") }
       var description by remember { mutableStateOf("") }

       Column(modifier = Modifier.padding(16.dp)) {
           TextField(
               value = title,
               onValueChange = { title = it },
               label = { Text("Task Title") }
           )
           Spacer(modifier = Modifier.height(8.dp))
           TextField(
               value = description,
               onValueChange = { description = it },
               label = { Text("Task Description") }
           )
           Spacer(modifier = Modifier.height(16.dp))
           Button(onClick = {
               if (title.isNotBlank() && description.isNotBlank()) {
                   onSave(title, description)
                   title = ""
                   description = ""
               }
           }) {
               Text("Add Task")
           }
       }
   }

   @Composable
   fun TaskListItem(task: Task, onUpdate: (Task) -> Unit, onDelete: (Task) -> Unit) {
       Row(
           modifier = Modifier
               .fillMaxWidth()
               .padding(16.dp),
           horizontalArrangement = Arrangement.SpaceBetween
       ) {
           Column {
               Text(text = task.title, style = MaterialTheme.typography.h6)
               Text(text = task.description, style = MaterialTheme.typography.body1)
           }
           Row {
               IconButton(onClick = { onUpdate(task) }) {
                   Icon(Icons.Default.Edit, contentDescription = "Edit")
               }
               IconButton(onClick = { onDelete(task) }) {
                   Icon(Icons.Default.Delete, contentDescription = "Delete")
               }
           }
       }
   }
   ```

7. **Set Up Main Activity**

   Use the `setContent` method to display the `TaskListScreen`.

   ```kotlin
   @AndroidEntryPoint
   class MainActivity : ComponentActivity() {
       override fun onCreate(savedInstanceState: Bundle?) {
           super.onCreate(savedInstanceState)
           setContent {
               ComposeWithRoomTheme {
                   Surface {
                       TaskListScreen()
                   }
               }
           }
       }
   }
   ```

#### 6.2 Example: Note-Taking Application

**Building a simple note-taking app with ViewModel and Room**

In this section, we will build a simple note-taking application using ViewModel, Room, and Jetpack Compose. The app will allow users to add, update, delete, and view notes.

1. **Set Up Dependencies**

   Ensure you have the necessary dependencies in your `build.gradle` file.

2. **Define Entities and DAOs**

   Create a `Note` entity and `NoteDao` interface.

   ```kotlin
   @Entity(tableName = "notes")
   data class Note(
       @PrimaryKey(autoGenerate = true) val id: Int = 0,
       val title: String,
       val content: String
   )

   @Dao
   interface NoteDao {
       @Query("SELECT * FROM notes")
       fun getAllNotes(): LiveData<List<Note>>

       @Insert
       suspend fun insert(note: Note)

       @Update
       suspend fun update(note: Note)

       @Delete
       suspend fun delete(note: Note)
   }
   ```

3. **Create Database Class**

   Define the `AppDatabase` class.

   ```kotlin
   @Database(entities = [Note::class], version = 1)
   abstract class AppDatabase : RoomDatabase() {
       abstract fun noteDao(): NoteDao
   }
   ```

4. **Set Up Dependency Injection**

   Use Hilt to provide the database and DAO instances.

   ```kotlin
   @HiltAndroidApp
   class MyApp : Application()

   @Module
   @InstallIn(SingletonComponent::class)
   object DatabaseModule {
       @Provides
       @Singleton
       fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
           return Room.databaseBuilder(
               context,
               AppDatabase::class.java,
               "note_database"
           ).build()
       }

       @Provides
       fun provideNoteDao(database: AppDatabase): NoteDao {
           return database.noteDao()
       }
   }
   ```

5. **Create ViewModel**

   Implement the `NoteViewModel` to handle UI-related data.

   ```kotlin
   @HiltViewModel
   class NoteViewModel @Inject constructor(private val noteDao: NoteDao) : ViewModel() {
       val notes: LiveData<List<Note>> = noteDao.getAllNotes()

       fun addNote(title: String, content: String) {
           viewModelScope.launch {
               noteDao.insert(Note(title = title, content = content))
           }
       }

       fun updateNote(note: Note) {
           viewModelScope.launch {
               noteDao.update(note)
           }
       }

       fun deleteNote(note: Note) {
           viewModelScope.launch {
               noteDao.delete(note)
           }
       }
   }
   ```

6. **Compose UI**

   Create Compose UI components to display and manage notes.

   ```kotlin
   @Composable
   fun NoteListScreen(viewModel: NoteViewModel = hiltViewModel()) {
       val notes by viewModel.notes.observeAsState(initial = emptyList())

       Column {
           NoteInputForm(onSave = { title, content -> viewModel.addNote(title, content) })
           LazyColumn {
               items(notes) { note ->
                   NoteListItem(
                       note = note,
                       onUpdate = { viewModel.updateNote(it) },
                       onDelete = { viewModel.deleteNote(it) }
                   )
               }
           }
       }
   }

   @Composable
   fun NoteInputForm(onSave: (String, String) -> Unit) {
       var title by remember { mutableStateOf("") }
       var content by remember { mutableStateOf("") }

       Column(modifier = Modifier.padding(16.dp)) {
           TextField(
               value = title,
               onValueChange = { title = it },
               label = { Text("Note Title") }
           )
           Spacer(modifier = Modifier.height(8.dp))
           TextField(
               value = content,
               onValueChange = { content = it },
               label = { Text("Note Content") }
           )
           Spacer(modifier = Modifier.height(16.dp))
           Button(onClick = {
               if (title.isNotBlank() && content.isNotBlank()) {
                   onSave(title, content)
                   title = ""
                   content = ""
               }
           }) {
               Text("Add Note")
           }
       }
   }

   @Composable
   fun NoteListItem(note: Note, onUpdate: (Note) -> Unit, onDelete: (Note) -> Unit) {
       Row(
           modifier = Modifier
               .fillMaxWidth()
               .padding(16.dp),
           horizontalArrangement = Arrangement.SpaceBetween
       ) {
           Column {
               Text(text = note.title, style = MaterialTheme.typography.h6)
               Text(text = note.content, style = MaterialTheme.typography.body1)
           }
           Row {
               IconButton(onClick = { onUpdate(note) }) {
                   Icon(Icons.Default.Edit, contentDescription = "Edit")
               }
               IconButton(onClick = { onDelete(note) }) {
                   Icon(Icons.Default.Delete, contentDescription = "Delete")
               }
           }
       }
   }
   ```

7. **Set Up Main Activity**

   Use the `setContent` method to display the `NoteListScreen`.

   ```kotlin
   @AndroidEntryPoint
   class MainActivity : ComponentActivity() {
       override fun onCreate(savedInstanceState: Bundle?) {
           super.onCreate(savedInstanceState)
           setContent {
               ComposeWithRoomTheme {
                   Surface {
                       NoteListScreen()
                   }
               }
           }
       }
   }
   ```

### Summary

In this chapter, we have explored how to utilize ViewModels for managing database operations in Android applications. We covered:

1. **Introduction to ViewModels**:
   - Understanding the role and lifecycle of ViewModels.
   - Importance of ViewModels in managing UI-related data.

2. **Setting Up ViewModels in a Project**:
   - Adding necessary dependencies.
   - Creating and setting up ViewModels using Hilt for dependency injection.

3. **Using ViewModels to Handle Database Operations**:
   - Integrating ViewModels with Room for data persistence.
   - Performing CRUD operations in a ViewModel.

4. **Observing LiveData from ViewModels in Jetpack Compose**:
   - Using LiveData in ViewModels and observing it in Compose UI.
   - Best practices for keeping UI in sync with data changes.

5. **Ensuring Data Persistence and UI Updates**:
   - Strategies for data persistence across configuration changes.
   - Using SavedStateHandle for preserving state.

6. **Practical Examples**:
   - Implementing a task management application.
   - Building a note-taking application with ViewModel and Room.

These practical examples demonstrate how ViewModels can simplify data management and ensure a responsive, lifecycle-aware UI in modern Android applications. By following these practices, you can build robust, maintainable, and efficient Android applications.

### Section 7: Summary and Next Steps

- **7.1 Recap of Key Points**
  - Summarizing the role of ViewModels in database operations

- **7.2 Preparing for the Next Chapter**
  - Teaser of the next chapter’s content
  - Suggested exercises or projects to reinforce learning

#### 7.1 Recap of Key Points

In this chapter, we explored the critical role of ViewModels in managing database operations and ensuring a responsive UI in Android applications. Here are the key points summarized:

1. **Introduction to ViewModels**:
   - ViewModels manage UI-related data in a lifecycle-aware manner, surviving configuration changes and separating UI logic from data handling.

2. **Setting Up ViewModels in a Project**:
   - Adding necessary dependencies for ViewModel and Hilt.
   - Creating and annotating ViewModels to manage data efficiently.

3. **Using ViewModels to Handle Database Operations**:
   - Integrating ViewModels with Room for efficient data management.
   - Performing CRUD operations within ViewModels to ensure data integrity and consistency.

4. **Observing LiveData from ViewModels in Jetpack Compose**:
   - Using LiveData to observe data changes and update the UI reactively.
   - Leveraging `observeAsState` in Jetpack Compose to bind LiveData to UI components.

5. **Ensuring Data Persistence and UI Updates**:
   - Strategies for maintaining data persistence across configuration changes.
   - Using SavedStateHandle to preserve UI state and ensure consistent user experience.

6. **Practical Examples**:
   - Implementing a task management application to demonstrate ViewModel and Room integration.
   - Building a note-taking application with ViewModel and Room to manage notes and update the UI.

By leveraging ViewModels, you can build robust Android applications that efficiently manage data and provide a seamless user experience, even through configuration changes.

#### 7.2 Preparing for the Next Chapter

**Teaser of the next chapter’s content**

In the next chapter, we will delve into advanced topics to further enhance your Android development skills. The upcoming chapter will cover:

1. **Advanced Room Features**:
   - Handling complex queries and relationships between entities.
   - Implementing database migrations and schema changes.

2. **Testing Room Databases**:
   - Writing unit tests for DAOs and database operations.
   - Using in-memory databases for testing.

3. **Performance Optimization**:
   - Techniques for optimizing Room database performance.
   - Best practices for efficient data retrieval and storage.

4. **Integrating Other Jetpack Libraries**:
   - Using WorkManager for background tasks.
   - Implementing Paging 3 library for large data sets.

**Suggested exercises or projects to reinforce learning**

To reinforce your understanding and prepare for the next chapter, consider the following exercises and projects:

1. **Extend the Task Management Application**:
   - Add features such as task priorities, deadlines, and notifications.
   - Implement sorting and filtering options for the task list.

2. **Create a Personal Finance Tracker**:
   - Use ViewModel and Room to build a personal finance tracker app.
   - Implement features such as expense tracking, budget management, and financial reports.

3. **Implement Advanced Room Queries**:
   - Experiment with complex queries involving multiple tables and relationships.
   - Practice writing and testing migration scripts for schema changes.

4. **Optimize an Existing Project**:
   - Take an existing Room database project and apply performance optimization techniques.
   - Measure the impact of these optimizations on app performance.

By completing these exercises, you will gain hands-on experience with advanced features and best practices, further solidifying your skills in building robust Android applications with ViewModels and Room.
