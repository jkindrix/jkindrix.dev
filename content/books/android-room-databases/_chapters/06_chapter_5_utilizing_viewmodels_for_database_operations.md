---
title: "Chapter 5 Utilizing Viewmodels For Database Operations"
---

## Chapter 5: Utilizing ViewModels for Database Operations

This chapter would explain the role of ViewModels in managing UI-related data in a lifecycle-conscious way. Key topics would include:

- Introduction to ViewModels and their lifecycle
- Setting up ViewModels in a project
- Using ViewModels to handle database operations
- Observing LiveData from ViewModels in Jetpack Compose
- Ensuring data persistence and UI updates through ViewModels

Practical examples would demonstrate how ViewModels streamline data management and UI interactions.

### Section 1: Introduction to ViewModels

- **1.1 What is a ViewModel?**
  - Definition and purpose of ViewModels
  - Importance of ViewModels in Android architecture

- **1.2 ViewModel Lifecycle**
  - Lifecycle of a ViewModel
  - How ViewModels manage UI-related data in a lifecycle-conscious way

#### 1.1 What is a ViewModel?

**Definition and purpose of ViewModels**

A ViewModel is a class designed to store and manage UI-related data in a lifecycle-aware manner. It is part of the Android Architecture Components and plays a crucial role in separating the UI logic from the business logic, making the code more modular and easier to test. ViewModels are intended to hold and process data for UI components such as activities and fragments, ensuring that the data survives configuration changes like screen rotations.

Key features of ViewModels:
- **Data Persistence**: ViewModels retain their state across configuration changes, preventing data loss and unnecessary re-fetching of data.
- **Separation of Concerns**: By moving UI-related data processing out of activities and fragments, ViewModels help achieve a clean separation between UI and data logic.
- **Lifecycle Awareness**: ViewModels are lifecycle-aware, meaning they are scoped to the lifecycle of the UI component they are associated with. This ensures that they are only active when the UI component is active, helping to avoid memory leaks and unnecessary operations.

Example:
```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(private val userDao: UserDao) : ViewModel() {
    val users: LiveData<List<User>> = userDao.getAllUsers().asLiveData()
}
```

**Importance of ViewModels in Android architecture**

In the modern Android architecture, ViewModels play a critical role in maintaining a clear and efficient separation between the UI layer and the data layer. This separation is essential for several reasons:

1. **Improved Code Organization**: By delegating data handling to ViewModels, activities and fragments can focus solely on displaying data and handling user interactions.
2. **Enhanced Testability**: ViewModels are easier to test in isolation compared to UI components, which often require a fully constructed UI environment.
3. **Lifecycle Management**: ViewModels help manage the lifecycle of data, ensuring that data is only fetched and updated when necessary, and preventing data loss during configuration changes.

#### 1.2 ViewModel Lifecycle

**Lifecycle of a ViewModel**

ViewModels have a lifecycle that is tied to the lifecycle of the UI component they are associated with. They are created when the UI component is created and survive configuration changes, such as screen rotations. ViewModels are cleared when the UI component is permanently destroyed, such as when the user navigates away from the activity or fragment.

Lifecycle stages:
1. **Creation**: A ViewModel is created the first time an activity or fragment is instantiated. This creation can be handled manually or via a dependency injection framework like Hilt.
2. **Configuration Changes**: During configuration changes (e.g., device rotation), the ViewModel persists its state, while the activity or fragment is destroyed and recreated.
3. **Clearing**: When the activity or fragment is finished, and the user navigates away, the ViewModel is cleared, releasing any held resources.

Diagram of ViewModel lifecycle:
```
Activity/Fragment Created -> ViewModel Created -> Configuration Change -> Activity/Fragment Recreated -> ViewModel Retained -> Activity/Fragment Finished -> ViewModel Cleared
```

**How ViewModels manage UI-related data in a lifecycle-conscious way**

ViewModels manage UI-related data in a lifecycle-conscious way by leveraging the following mechanisms:

1. **LiveData**: ViewModels often expose data using LiveData, which is an observable data holder class. LiveData respects the lifecycle of the activity or fragment it is associated with, ensuring that updates are only sent to active observers. This prevents memory leaks and reduces unnecessary updates.

Example:
```kotlin
class UserViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> get() = _users

    fun loadUsers() {
        // Load users from database or network
        _users.value = listOf() // Example data
    }
}
```

2. **ViewModelScope**: ViewModels provide a coroutine scope, `viewModelScope`, which is tied to the ViewModel's lifecycle. This scope is used to launch coroutines that are automatically canceled when the ViewModel is cleared, preventing memory leaks and unnecessary background work.

Example:
```kotlin
class UserViewModel : ViewModel() {
    fun fetchUsers() {
        viewModelScope.launch {
            val users = repository.getUsers()
            _users.postValue(users)
        }
    }
}
```

By using these tools, ViewModels ensure that data is managed efficiently and safely, adapting to the lifecycle of the UI components they support. This results in a more responsive, maintainable, and robust application architecture.

### Section 2: Setting Up ViewModels in a Project

- **2.1 Adding ViewModel Dependencies**
  - Updating Gradle files to include ViewModel dependencies
  - Ensuring all necessary libraries are included

- **2.2 Creating a ViewModel**
  - Step-by-step guide to creating a basic ViewModel
  - Annotating ViewModel with `@HiltViewModel` if using Hilt

#### 2.1 Adding ViewModel Dependencies

**Updating Gradle files to include ViewModel dependencies**

To use ViewModel in your project, you need to add the necessary dependencies to your `build.gradle` files. Here’s how to do it:

1. **Open your project’s `build.gradle` file (project-level)**:
   Make sure you have the necessary repositories included:
   ```groovy
   buildscript {
       ext.kotlin_version = "1.5.31"
       repositories {
           google()
           mavenCentral()
       }
       dependencies {
           classpath "com.android.tools.build:gradle:7.0.2"
           classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
           classpath "com.google.dagger:hilt-android-gradle-plugin:2.38.1"
       }
   }

   allprojects {
       repositories {
           google()
           mavenCentral()
       }
   }
   ```

2. **Update the app module’s `build.gradle` file**:
   Add the ViewModel and Hilt dependencies:
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
           applicationId "com.example.app"
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

       // ViewModel dependency
       implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.1"

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

3. **Sync your project**:
   Click "Sync Now" in the notification bar to sync your project with the updated Gradle files.

**Ensuring all necessary libraries are included**

Ensure that the following libraries are included in your `build.gradle` file:
- **ViewModel**: `androidx.lifecycle:lifecycle-viewmodel-ktx`
- **Hilt**: `com.google.dagger:hilt-android` and `com.google.dagger:hilt-android-compiler`
- **Compose**: `androidx.compose.ui:ui`, `androidx.compose.material:material`, `androidx.activity:activity-compose`

#### 2.2 Creating a ViewModel

**Step-by-step guide to creating a basic ViewModel**

Creating a ViewModel involves defining a class that extends `ViewModel` and using it to manage UI-related data. Here’s a step-by-step guide:

1. **Create the ViewModel class**:
   Define a new class that extends `ViewModel`.

   ```kotlin
   import androidx.lifecycle.ViewModel

   class UserViewModel : ViewModel() {
       // Define LiveData or other properties to hold UI-related data
       private val _users = MutableLiveData<List<User>>()
       val users: LiveData<List<User>> get() = _users

       // Initialize or load data
       init {
           loadUsers()
       }

       private fun loadUsers() {
           // Load data from repository or other source
           _users.value = listOf() // Example data
       }
   }
   ```

2. **Annotate ViewModel with `@HiltViewModel` if using Hilt**

   If you are using Hilt for dependency injection, annotate the ViewModel class with `@HiltViewModel` and use `@Inject` to provide dependencies.

   ```kotlin
   import androidx.lifecycle.ViewModel
   import dagger.hilt.android.lifecycle.HiltViewModel
   import javax.inject.Inject

   @HiltViewModel
   class UserViewModel @Inject constructor(private val userRepository: UserRepository) : ViewModel() {
       private val _users = MutableLiveData<List<User>>()
       val users: LiveData<List<User>> get() = _users

       init {
           loadUsers()
       }

       private fun loadUsers() {
           // Load data from repository
           _users.value = userRepository.getUsers()
       }
   }
   ```

3. **Use ViewModel in a Composable function**

   In your composable functions, use the `viewModel` function to obtain an instance of your ViewModel and observe the data.

   ```kotlin
   @Composable
   fun UserListScreen(viewModel: UserViewModel = hiltViewModel()) {
       val users by viewModel.users.observeAsState(initial = emptyList())

       LazyColumn {
           items(users) { user ->
               Text(text = user.name)
           }
       }
   }
   ```

By following these steps, you can set up and use ViewModels in your project, ensuring efficient and lifecycle-aware management of UI-related data. The next sections will cover using ViewModels to handle database operations and observing LiveData from ViewModels in Jetpack Compose.

### Section 3: Using ViewModels to Handle Database Operations

- **3.1 Integrating ViewModel with Room Database**
  - Fetching data from Room database within a ViewModel
  - Performing CRUD operations in a ViewModel

- **3.2 Handling Asynchronous Operations**
  - Using Kotlin coroutines with ViewModel
  - Best practices for handling asynchronous database operations

#### 3.1 Integrating ViewModel with Room Database

**Fetching data from Room database within a ViewModel**

Integrating ViewModel with Room database involves fetching data from the database and exposing it to the UI layer. The ViewModel acts as an intermediary between the Room database and the UI components.

1. **Define DAO with required queries**:
   Create a DAO interface with methods to fetch data from the Room database.

   ```kotlin
   @Dao
   interface UserDao {
       @Query("SELECT * FROM users")
       fun getAllUsers(): LiveData<List<User>>
   }
   ```

2. **Create a Repository**:
   A repository abstracts the data layer, providing a clean API for data access to the rest of the application.

   ```kotlin
   class UserRepository @Inject constructor(private val userDao: UserDao) {
       val allUsers: LiveData<List<User>> = userDao.getAllUsers()
   }
   ```

3. **Integrate ViewModel with Repository**:
   In the ViewModel, inject the repository and use it to fetch data from the Room database.

   ```kotlin
   @HiltViewModel
   class UserViewModel @Inject constructor(private val userRepository: UserRepository) : ViewModel() {
       val users: LiveData<List<User>> = userRepository.allUsers
   }
   ```

4. **Observe data in Composable**:
   Use the ViewModel in your composable function to observe the data and display it.

   ```kotlin
   @Composable
   fun UserListScreen(viewModel: UserViewModel = hiltViewModel()) {
       val users by viewModel.users.observeAsState(initial = emptyList())

       LazyColumn {
           items(users) { user ->
               Text(text = user.name)
           }
       }
   }
   ```

**Performing CRUD operations in a ViewModel**

CRUD (Create, Read, Update, Delete) operations can be performed in the ViewModel by defining corresponding methods and using the repository to interact with the Room database.

1. **Define CRUD methods in Repository**:
   Implement methods for inserting, updating, and deleting records in the repository.

   ```kotlin
   class UserRepository @Inject constructor(private val userDao: UserDao) {
       val allUsers: LiveData<List<User>> = userDao.getAllUsers()

       suspend fun insert(user: User) {
           userDao.insert(user)
       }

       suspend fun update(user: User) {
           userDao.update(user)
       }

       suspend fun delete(user: User) {
           userDao.delete(user)
       }
   }
   ```

2. **Expose CRUD methods in ViewModel**:
   Use the repository methods in the ViewModel to perform CRUD operations.

   ```kotlin
   @HiltViewModel
   class UserViewModel @Inject constructor(private val userRepository: UserRepository) : ViewModel() {
       val users: LiveData<List<User>> = userRepository.allUsers

       fun addUser(user: User) {
           viewModelScope.launch {
               userRepository.insert(user)
           }
       }

       fun updateUser(user: User) {
           viewModelScope.launch {
               userRepository.update(user)
           }
       }

       fun deleteUser(user: User) {
           viewModelScope.launch {
               userRepository.delete(user)
           }
       }
   }
   ```

3. **Invoke CRUD methods from Composable**:
   Call the ViewModel methods from the composable functions to perform CRUD operations.

   ```kotlin
   @Composable
   fun UserListScreen(viewModel: UserViewModel = hiltViewModel()) {
       val users by viewModel.users.observeAsState(initial = emptyList())

       Column {
           Button(onClick = { viewModel.addUser(User(name = "New User")) }) {
               Text("Add User")
           }
           LazyColumn {
               items(users) { user ->
                   Row {
                       Text(text = user.name)
                       Button(onClick = { viewModel.deleteUser(user) }) {
                           Text("Delete")
                       }
                   }
               }
           }
       }
   }
   ```

#### 3.2 Handling Asynchronous Operations

**Using Kotlin coroutines with ViewModel**

Kotlin coroutines are a powerful way to handle asynchronous operations in Android. ViewModels provide a coroutine scope, `viewModelScope`, which is tied to the ViewModel's lifecycle, making it ideal for performing long-running operations like database access.

1. **Use `viewModelScope` to launch coroutines**:
   Launch coroutines within the ViewModel using `viewModelScope`.

   ```kotlin
   @HiltViewModel
   class UserViewModel @Inject constructor(private val userRepository: UserRepository) : ViewModel() {
       val users: LiveData<List<User>> = userRepository.allUsers

       fun addUser(user: User) {
           viewModelScope.launch {
               userRepository.insert(user)
           }
       }

       fun updateUser(user: User) {
           viewModelScope.launch {
               userRepository.update(user)
           }
       }

       fun deleteUser(user: User) {
           viewModelScope.launch {
               userRepository.delete(user)
           }
       }
   }
   ```

**Best practices for handling asynchronous database operations**

1. **Use `suspend` functions for database operations**:
   Mark database operations in the DAO and repository as `suspend` functions to indicate that they should be run on a background thread.

   ```kotlin
   @Dao
   interface UserDao {
       @Insert
       suspend fun insert(user: User)

       @Update
       suspend fun update(user: User)

       @Delete
       suspend fun delete(user: User)
   }
   ```

2. **Leverage `viewModelScope` for lifecycle-aware coroutines**:
   Use `viewModelScope` to ensure that coroutines are automatically canceled when the ViewModel is cleared.

3. **Handle exceptions gracefully**:
   Use `try-catch` blocks or coroutine exception handlers to handle exceptions and provide feedback to the user.

   ```kotlin
   fun addUser(user: User) {
       viewModelScope.launch {
           try {
               userRepository.insert(user)
           } catch (e: Exception) {
               // Handle the exception, e.g., show an error message
           }
       }
   }
   ```

By integrating ViewModels with Room database and handling asynchronous operations using Kotlin coroutines, you can ensure that your database interactions are efficient, responsive, and lifecycle-aware. This setup provides a robust foundation for managing UI-related data and performing CRUD operations in your Android applications.

### Section 4: Observing LiveData from ViewModels in Jetpack Compose

- **4.1 Introduction to LiveData**
  - What is LiveData and how it works
  - Benefits of using LiveData in ViewModels

- **4.2 Observing LiveData in Compose**
  - Using `observeAsState` to observe LiveData in Jetpack Compose
  - Updating Compose UI based on LiveData changes

#### 4.1 Introduction to LiveData

**What is LiveData and how it works**

LiveData is an observable data holder class provided by the Android Jetpack library. It is designed to hold and manage UI-related data in a lifecycle-aware manner, ensuring that the UI components observe only data that is in an active lifecycle state.

Key features of LiveData:
- **Lifecycle Awareness**: LiveData is lifecycle-aware, meaning it only updates observers that are in an active lifecycle state (e.g., STARTED or RESUMED). This prevents memory leaks and unnecessary updates.
- **Automatic Cleanup**: When the lifecycle owner (such as an activity or fragment) is destroyed, LiveData automatically removes the observer, ensuring efficient memory management.
- **Simplicity and Ease of Use**: LiveData simplifies the process of keeping the UI in sync with data changes, reducing boilerplate code.

**Benefits of using LiveData in ViewModels**

1. **Lifecycle Awareness**: LiveData respects the lifecycle of UI components, ensuring data updates are only sent when the UI is active, preventing crashes and memory leaks.
2. **Automatic Updates**: UI components automatically receive updates when the data changes, reducing the need for manual UI refreshes.
3. **Separation of Concerns**: Using LiveData in ViewModels helps separate UI logic from data handling logic, promoting a cleaner architecture.
4. **Simplicity**: LiveData is easy to integrate and use within ViewModels, making it a straightforward choice for managing UI-related data.

Example:
```kotlin
class UserViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> get() = _users

    init {
        loadUsers()
    }

    private fun loadUsers() {
        // Simulate loading data from a repository
        _users.value = listOf(User(name = "John Doe"))
    }
}
```

#### 4.2 Observing LiveData in Compose

**Using `observeAsState` to observe LiveData in Jetpack Compose**

Jetpack Compose provides the `observeAsState` extension function to observe LiveData objects within composable functions. This function converts LiveData into a Compose `State` object, allowing the UI to reactively update based on LiveData changes.

1. **Convert LiveData to State**:
   Use the `observeAsState` function to observe LiveData and convert it into a Compose `State` object.

   ```kotlin
   @Composable
   fun UserListScreen(viewModel: UserViewModel = hiltViewModel()) {
       val users by viewModel.users.observeAsState(initial = emptyList())

       LazyColumn {
           items(users) { user ->
               Text(text = user.name)
           }
       }
   }
   ```

2. **Automatic UI Updates**:
   When the underlying LiveData changes, the Compose UI will automatically recompose and update the UI with the new data.

   ```kotlin
   @Composable
   fun UserListScreen(viewModel: UserViewModel = hiltViewModel()) {
       val users by viewModel.users.observeAsState(initial = emptyList())

       Column {
           Text(text = "User List")
           LazyColumn {
               items(users) { user ->
                   Text(text = user.name)
               }
           }
       }
   }
   ```

**Updating Compose UI based on LiveData changes**

To ensure that your Compose UI updates based on LiveData changes, follow these steps:

1. **Initialize LiveData in ViewModel**:
   Ensure that LiveData is properly initialized and holds the necessary data.

   ```kotlin
   class UserViewModel : ViewModel() {
       private val _users = MutableLiveData<List<User>>()
       val users: LiveData<List<User>> get() = _users

       init {
           loadUsers()
       }

       private fun loadUsers() {
           // Simulate loading data from a repository
           _users.value = listOf(User(name = "John Doe"), User(name = "Jane Doe"))
       }
   }
   ```

2. **Observe LiveData in Composable Function**:
   Use the `observeAsState` extension function to observe the LiveData object and convert it into a Compose `State`.

   ```kotlin
   @Composable
   fun UserListScreen(viewModel: UserViewModel = hiltViewModel()) {
       val users by viewModel.users.observeAsState(initial = emptyList())

       LazyColumn {
           items(users) { user ->
               UserListItem(user)
           }
       }
   }

   @Composable
   fun UserListItem(user: User) {
       Text(text = user.name, modifier = Modifier.padding(16.dp))
   }
   ```

3. **Handle LiveData Changes**:
   Compose automatically recomposes the affected parts of the UI when the observed LiveData changes. Ensure that your composable functions are stateless and rely on state objects to reflect the current UI state.

By leveraging LiveData and `observeAsState` in Jetpack Compose, you can efficiently manage UI updates in response to data changes, ensuring a responsive and dynamic user experience. This approach aligns with best practices for modern Android development, promoting a clear separation of concerns and lifecycle-aware data management.

### Section 5: Ensuring Data Persistence and UI Updates

- **5.1 Data Persistence with ViewModel**
  - Strategies for ensuring data persistence across configuration changes
  - Using SavedStateHandle for preserving state

- **5.2 UI Updates through ViewModel**
  - Best practices for keeping the UI in sync with data changes
  - Examples of real-time UI updates using ViewModel and LiveData

#### 5.1 Data Persistence with ViewModel

**Strategies for ensuring data persistence across configuration changes**

ViewModels are designed to survive configuration changes such as screen rotations, ensuring that the data they hold is not lost and can be efficiently restored. This capability is crucial for maintaining a consistent user experience and avoiding unnecessary data re-fetching.

1. **Using ViewModel to Persist Data**:
   The primary strategy for ensuring data persistence is to store UI-related data in a ViewModel. Since ViewModels are scoped to the lifecycle of an activity or fragment and are not destroyed during configuration changes, they are an excellent tool for maintaining data persistence.

   Example:
   ```kotlin
   @HiltViewModel
   class UserViewModel @Inject constructor(private val userRepository: UserRepository) : ViewModel() {
       private val _users = MutableLiveData<List<User>>()
       val users: LiveData<List<User>> get() = _users

       init {
           loadUsers()
       }

       private fun loadUsers() {
           _users.value = userRepository.getUsers()
       }
   }
   ```

2. **Using SavedStateHandle for Preserving State**:
   SavedStateHandle is a key-value map that can be used within a ViewModel to save and retrieve UI state data across process death and recreation. This is especially useful for small pieces of data that are critical for restoring the UI state.

   Example:
   ```kotlin
   @HiltViewModel
   class UserViewModel @Inject constructor(
       private val userRepository: UserRepository,
       savedStateHandle: SavedStateHandle
   ) : ViewModel() {
       private val _username = savedStateHandle.getLiveData<String>("username")
       val username: LiveData<String> get() = _username

       fun setUsername(name: String) {
           _username.value = name
           savedStateHandle.set("username", name)
       }

       // Other data and methods
   }
   ```

**Using SavedStateHandle for preserving state**

SavedStateHandle provides a convenient way to save and restore data that should survive configuration changes and process death. This feature is particularly useful for managing UI state such as user input, scroll positions, or any transient data.

Example:
```kotlin
@HiltViewModel
class UserViewModel @Inject constructor(
    private val userRepository: UserRepository,
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {
    private val _searchQuery = savedStateHandle.getLiveData("searchQuery", "")
    val searchQuery: LiveData<String> get() = _searchQuery

    fun updateSearchQuery(query: String) {
        _searchQuery.value = query
        savedStateHandle.set("searchQuery", query)
    }

    fun getUsers(): LiveData<List<User>> {
        val query = _searchQuery.value ?: ""
        return if (query.isEmpty()) {
            userRepository.getAllUsers()
        } else {
            userRepository.searchUsers(query)
        }
    }
}
```

In this example:
- `SavedStateHandle` is used to store the search query, ensuring it is preserved across configuration changes and process death.
- The `updateSearchQuery` function updates both the LiveData and the SavedStateHandle.

#### 5.2 UI Updates through ViewModel

**Best practices for keeping the UI in sync with data changes**

To ensure that your UI remains in sync with data changes, follow these best practices:

1. **Use LiveData for Observing Data**:
   Use LiveData in your ViewModel to expose data to the UI. This ensures that the UI components only update when they are in an active lifecycle state.

2. **Leverage ViewModel and LiveData in Composable Functions**:
   Use the `observeAsState` function in Jetpack Compose to observe LiveData from the ViewModel, ensuring that the UI automatically updates when the data changes.

3. **Handle Data Changes Reactively**:
   Design your UI to respond reactively to data changes. Avoid direct data manipulation in your UI components; instead, delegate this responsibility to the ViewModel.

4. **Manage State Effectively**:
   Use state management techniques like `remember`, `rememberSaveable`, and `State` in Jetpack Compose to manage UI state effectively and ensure consistency across recompositions.

**Examples of real-time UI updates using ViewModel and LiveData**

1. **Real-Time Data Display**:
   ```kotlin
   @Composable
   fun UserListScreen(viewModel: UserViewModel = hiltViewModel()) {
       val users by viewModel.users.observeAsState(initial = emptyList())

       LazyColumn {
           items(users) { user ->
               UserListItem(user)
           }
       }
   }

   @Composable
   fun UserListItem(user: User) {
       Text(text = user.name, modifier = Modifier.padding(16.dp))
   }
   ```

2. **Updating UI Based on User Input**:
   ```kotlin
   @Composable
   fun UserSearchScreen(viewModel: UserViewModel = hiltViewModel()) {
       val searchQuery by viewModel.searchQuery.observeAsState("")
       val users by viewModel.getUsers().observeAsState(emptyList())

       Column {
           TextField(
               value = searchQuery,
               onValueChange = { viewModel.updateSearchQuery(it) },
               label = { Text("Search") }
           )
           LazyColumn {
               items(users) { user ->
                   UserListItem(user)
               }
           }
       }
   }
   ```

In this example:
- The `UserSearchScreen` composable observes the `searchQuery` LiveData and the list of users, updating the UI in real-time based on user input.
- The `TextField` updates the search query in the ViewModel, which then filters the users list accordingly.

By following these best practices and examples, you can ensure that your UI remains responsive and in sync with the underlying data managed by ViewModels and LiveData. This approach promotes a clean separation of concerns, enhances maintainability, and provides a robust foundation for building dynamic Android applications.

### Section 6: Practical Examples

- **6.1 Example: Task Management Application**
  - Step-by-step guide to implementing a task management app
  - Using ViewModel to manage tasks and update UI

- **6.2 Example: Note-Taking Application**
  - Building a simple note-taking app with ViewModel and Room
  - Managing notes and reflecting changes in the UI
