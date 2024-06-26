## Chapter 2: Setting Up the Development Environment

This chapter would guide the reader through the process of setting up the necessary tools and environment for Android development. It would include steps to install Android Studio, configure Kotlin, set up Jetpack Compose, integrate ViewModels, and implement Hilt for dependency injection. Additionally, it would cover how to create a new project and configure it for database management.

### Section 1: Installing and Configuring Android Studio

- **1.1 Downloading Android Studio**
  - Where to download Android Studio
  - System requirements and installation instructions

- **1.2 Initial Setup of Android Studio**
  - First-time launch and setup wizard
  - Configuring the Android SDK and required components

#### 1.1 Downloading Android Studio

**Where to download Android Studio**

Android Studio is the official integrated development environment (IDE) for Android development, offered by Google. It can be downloaded from the official Android developer website:

- Visit the [Android Studio download page](https://developer.android.com/studio) to get the latest version.
- Choose the appropriate version for your operating system (Windows, macOS, or Linux).

**System requirements and installation instructions**

Before downloading Android Studio, ensure your system meets the following requirements:

- **Windows**:
  - OS: Windows 7/8/10 (32- or 64-bit)
  - RAM: 4 GB minimum, 8 GB recommended
  - Disk space: 2 GB for Android Studio, plus at least 4 GB for Android SDK and emulator system images
  - JDK: Bundled with Android Studio

- **macOS**:
  - OS: macOS 10.10 (Yosemite) or higher
  - RAM: 4 GB minimum, 8 GB recommended
  - Disk space: 2 GB for Android Studio, plus at least 4 GB for Android SDK and emulator system images
  - JDK: Bundled with Android Studio

- **Linux**:
  - OS: GNU/Linux, Ubuntu 14.04 or higher
  - RAM: 4 GB minimum, 8 GB recommended
  - Disk space: 2 GB for Android Studio, plus at least 4 GB for Android SDK and emulator system images
  - Required libraries: GNU C Library (glibc) 2.19 or later, 64-bit distributions must be capable of running 32-bit applications

**Installation Instructions**:

1. **Windows**:
   - Download the .exe file from the Android Studio download page.
   - Run the installer and follow the on-screen instructions.
   - During installation, choose the appropriate options for your development needs, including the installation of the Android SDK, Android Virtual Device (AVD), and additional components.

2. **macOS**:
   - Download the .dmg file from the Android Studio download page.
   - Open the .dmg file and drag the Android Studio icon to the Applications folder.
   - Launch Android Studio from the Applications folder and follow the setup wizard instructions.

3. **Linux**:
   - Download the .zip file from the Android Studio download page.
   - Unzip the file to a suitable location, such as /usr/local/ or your home directory.
   - Navigate to the android-studio/bin/ directory and execute `studio.sh` to launch Android Studio.
   - Follow the setup wizard instructions to complete the installation.

#### 1.2 Initial Setup of Android Studio

**First-time launch and setup wizard**

When you launch Android Studio for the first time, you will be greeted by the setup wizard. This wizard helps you configure the initial settings required for Android development.

1. **Welcome Screen**:
   - On the welcome screen, click "Next" to start the setup process.

2. **Install Type**:
   - Choose the "Standard" installation type for the most common settings and options. Advanced users can choose "Custom" to specify additional options.
   - Click "Next" to continue.

3. **SDK Components Setup**:
   - Android Studio will prompt you to install the Android SDK, which includes essential tools and libraries for Android development.
   - Ensure that the required SDK components, such as the SDK Platform and Android Emulator, are selected.
   - Click "Next" to proceed.

4. **Emulator Settings**:
   - Configure the settings for the Android Emulator, which allows you to run and test your apps on virtual devices.
   - Allocate sufficient RAM for the emulator to ensure smooth performance.
   - Click "Next" to continue.

5. **Verify Settings**:
   - Review the settings you have selected. If everything looks good, click "Finish" to complete the setup.
   - Android Studio will download and install the necessary components, which may take some time depending on your internet connection.

**Configuring the Android SDK and required components**

Once the initial setup is complete, you need to configure the Android SDK and install any additional components required for your projects.

1. **SDK Manager**:
   - Open Android Studio and navigate to "File" > "Settings" (or "Android Studio" > "Preferences" on macOS).
   - In the left-hand menu, select "Appearance & Behavior" > "System Settings" > "Android SDK".
   - Ensure that the appropriate SDK platforms and tools are installed. You can add or remove components as needed.

2. **AVD Manager**:
   - To create and manage virtual devices, go to "Tools" > "AVD Manager".
   - Click "Create Virtual Device" and follow the prompts to configure a new Android Virtual Device (AVD).
   - Select the hardware profile, system image, and emulator settings that best suit your development needs.

3. **Gradle Configuration**:
   - Gradle is the build system used by Android Studio. Ensure that the Gradle settings are configured correctly by navigating to "File" > "Settings" > "Build, Execution, Deployment" > "Build Tools" > "Gradle".
   - You can specify the Gradle version and other build settings here.

By following these steps, you will have a fully configured Android Studio environment ready for developing Android applications. In the next sections, we will cover setting up Kotlin, Jetpack Compose, ViewModels, and Hilt for a comprehensive development setup.


### Section 2: Configuring Kotlin

- **2.1 Enabling Kotlin in Android Studio**
  - Setting Kotlin as the default language for new projects
  - Verifying Kotlin setup

- **2.2 Updating Kotlin Plugin**
  - Keeping Kotlin and its dependencies up-to-date
  - Troubleshooting common issues with Kotlin setup

#### 2.1 Enabling Kotlin in Android Studio

**Setting Kotlin as the default language for new projects**

To enable Kotlin as the default language in Android Studio, follow these steps:

1. **Create a New Project**:
   - Open Android Studio and click on "Start a new Android Studio project".
   - In the "Create New Project" window, choose a project template that suits your needs (e.g., "Empty Activity").

2. **Configure Your Project**:
   - In the "Configure your project" screen, fill in the required fields such as "Name", "Package name", and "Save location".
   - Under "Language", select "Kotlin" from the dropdown menu.
   - Configure other settings like "Minimum API level" based on your project requirements.
   - Click "Finish" to create the project.

3. **Verify Kotlin Setup**:
   - After the project is created, open the `build.gradle` file in the project’s root directory.
   - Ensure that the Kotlin plugin is applied. You should see the following lines:
     ```groovy
     plugins {
         id 'com.android.application'
         id 'org.jetbrains.kotlin.android'
     }
     ```
   - Verify that the Kotlin standard library is included in the dependencies:
     ```groovy
     dependencies {
         implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
         // Other dependencies
     }
     ```

**Verifying Kotlin setup**

To ensure that Kotlin is properly configured in your project, perform the following checks:

1. **Kotlin Version**:
   - Open the `build.gradle` file in the project’s root directory.
   - Check the Kotlin version specified in the `ext.kotlin_version` property:
     ```groovy
     buildscript {
         ext.kotlin_version = '1.5.21'
         repositories {
             google()
             mavenCentral()
         }
         dependencies {
             classpath "com.android.tools.build:gradle:4.2.2"
             classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
         }
     }
     ```

2. **Kotlin Plugin in Module-level `build.gradle`**:
   - Open the `build.gradle` file in the app module directory.
   - Verify that the Kotlin plugin is applied, and the Kotlin standard library is included in the dependencies.

3. **Run a Kotlin File**:
   - Create a simple Kotlin file to test the setup.
   - In the `src/main/java` directory, create a new Kotlin file (e.g., `MainActivity.kt`).
   - Write a basic Kotlin function:
     ```kotlin
     package com.example.myapp

     import android.os.Bundle
     import androidx.appcompat.app.AppCompatActivity

     class MainActivity : AppCompatActivity() {
         override fun onCreate(savedInstanceState: Bundle?) {
             super.onCreate(savedInstanceState)
             setContentView(R.layout.activity_main)

             println("Hello, Kotlin!")
         }
     }
     ```
   - Run the app to ensure that Kotlin is working correctly.

#### 2.2 Updating Kotlin Plugin

**Keeping Kotlin and its dependencies up-to-date**

To keep Kotlin and its dependencies up-to-date, follow these steps:

1. **Check for Updates**:
   - In Android Studio, go to "File" > "Settings" (or "Android Studio" > "Preferences" on macOS).
   - Navigate to "Appearance & Behavior" > "System Settings" > "Updates".
   - Click "Check for Updates" to see if there are any updates available for Android Studio, the Kotlin plugin, or other components.

2. **Update Kotlin Plugin**:
   - Go to "Tools" > "Kotlin" > "Configure Kotlin Plugin Updates".
   - Select "Stable" to get stable releases or choose "Early Access Preview" to get early updates.
   - Click "Check for updates now" to see if a new version of the Kotlin plugin is available.
   - If an update is available, follow the prompts to install it.

3. **Update Project Dependencies**:
   - Open the `build.gradle` file in the project’s root directory.
   - Update the Kotlin version in the `ext.kotlin_version` property to the latest version:
     ```groovy
     ext.kotlin_version = '1.5.31' // Update to the latest version
     ```
   - Sync the project with Gradle files by clicking "Sync Now" in the notification bar.

**Troubleshooting common issues with Kotlin setup**

Here are some common issues you might encounter with Kotlin setup and their solutions:

1. **Gradle Sync Issues**:
   - If you encounter errors during Gradle sync, try cleaning and rebuilding the project by going to "Build" > "Clean Project" and then "Build" > "Rebuild Project".
   - Ensure that your Gradle and Kotlin plugin versions are compatible. Check the official [Kotlin documentation](https://kotlinlang.org/docs/gradle.html) for the recommended versions.

2. **Kotlin Runtime Errors**:
   - If you see runtime errors related to Kotlin, ensure that the Kotlin standard library is included in your project dependencies.
   - Verify that you are not using deprecated Kotlin features by checking the project’s `build.gradle` file and updating deprecated APIs.

3. **IDE Performance Issues**:
   - If Android Studio becomes slow or unresponsive after enabling Kotlin, try increasing the IDE's memory allocation. Go to "Help" > "Edit Custom VM Options" and increase the `-Xmx` value (e.g., `-Xmx2048m` for 2GB of memory).
   - Disable unnecessary plugins by going to "File" > "Settings" > "Plugins" and unchecking plugins you do not use.

By following these steps, you will ensure that Kotlin is properly configured and up-to-date in your Android Studio environment, allowing you to take full advantage of its features for Android development.

### Section 3: Setting Up Jetpack Compose

- **3.1 Adding Jetpack Compose to Your Project**
  - Updating Gradle files to include Jetpack Compose dependencies
  - Configuring Compose Compiler and versioning

- **3.2 Basic Jetpack Compose Setup**
  - Creating a simple Compose UI
  - Verifying Compose setup with a sample project

#### 3.1 Adding Jetpack Compose to Your Project

**Updating Gradle files to include Jetpack Compose dependencies**

To start using Jetpack Compose in your project, you need to add the necessary dependencies to your Gradle files. Here’s how to do it:

1. **Open your project’s `build.gradle` file**:
   - In the root directory of your project, locate and open the `build.gradle` file.

2. **Add Jetpack Compose dependencies**:
   - Update the `build.gradle` file in the app module directory to include Jetpack Compose dependencies:
     ```groovy
     plugins {
         id 'com.android.application'
         id 'org.jetbrains.kotlin.android'
     }

     android {
         compileSdkVersion 30

         defaultConfig {
             applicationId "com.example.mycomposeapp"
             minSdkVersion 21
             targetSdkVersion 30
             versionCode 1
             versionName "1.0"
         }

         buildFeatures {
             compose true
         }

         composeOptions {
             kotlinCompilerExtensionVersion "1.1.0-alpha03"
         }

         kotlinOptions {
             jvmTarget = '1.8'
         }
     }

     dependencies {
         implementation "androidx.core:core-ktx:1.6.0"
         implementation "androidx.appcompat:appcompat:1.3.1"
         implementation "com.google.android.material:material:1.4.0"
         implementation "androidx.compose.ui:ui:1.0.1"
         implementation "androidx.compose.material:material:1.0.1"
         implementation "androidx.compose.ui:ui-tooling-preview:1.0.1"
         implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.3.1"
         implementation "androidx.activity:activity-compose:1.3.1"
         debugImplementation "androidx.compose.ui:ui-tooling:1.0.1"
     }
     ```

3. **Sync your project with Gradle files**:
   - After adding the dependencies, click "Sync Now" in the notification bar to sync your project with the updated Gradle files.

**Configuring Compose Compiler and versioning**

1. **Set the Compose Compiler version**:
   - In the `build.gradle` file, under the `composeOptions` section, specify the Compose Compiler version that matches the Jetpack Compose version you are using. For example:
     ```groovy
     composeOptions {
         kotlinCompilerExtensionVersion "1.1.0-alpha03"
     }
     ```

2. **Kotlin Compiler settings**:
   - Ensure that the Kotlin compiler is set to the appropriate JVM target. Add the following to the `android` section of the `build.gradle` file:
     ```groovy
     kotlinOptions {
         jvmTarget = '1.8'
     }
     ```

By following these steps, you will have Jetpack Compose dependencies correctly added and configured in your project.

#### 3.2 Basic Jetpack Compose Setup

**Creating a simple Compose UI**

To verify that Jetpack Compose is set up correctly, create a simple Compose UI component:

1. **Create a Composable function**:
   - In the `src/main/java` directory, create a new Kotlin file (e.g., `MainActivity.kt`) and add the following code:
     ```kotlin
     package com.example.mycomposeapp

     import android.os.Bundle
     import androidx.activity.ComponentActivity
     import androidx.activity.compose.setContent
     import androidx.compose.foundation.layout.fillMaxSize
     import androidx.compose.material3.MaterialTheme
     import androidx.compose.material3.Surface
     import androidx.compose.material3.Text
     import androidx.compose.runtime.Composable
     import androidx.compose.ui.Modifier
     import androidx.compose.ui.tooling.preview.Preview
     import com.example.mycomposeapp.ui.theme.MyComposeAppTheme

     class MainActivity : ComponentActivity() {
         override fun onCreate(savedInstanceState: Bundle?) {
             super.onCreate(savedInstanceState)
             setContent {
                 MyComposeAppTheme {
                     // A surface container using the 'background' color from the theme
                     Surface(
                         modifier = Modifier.fillMaxSize(),
                         color = MaterialTheme.colorScheme.background
                     ) {
                         Greeting("Android")
                     }
                 }
             }
         }
     }

     @Composable
     fun Greeting(name: String) {
         Text(text = "Hello, $name!")
     }

     @Preview(showBackground = true)
     @Composable
     fun DefaultPreview() {
         MyComposeAppTheme {
             Greeting("Android")
         }
     }
     ```

2. **Theme setup**:
   - If you are using a theme, ensure it is correctly set up. For example, create a `Theme.kt` file under the `ui/theme` directory:
     ```kotlin
     package com.example.mycomposeapp.ui.theme

     import androidx.compose.foundation.isSystemInDarkTheme
     import androidx.compose.material3.MaterialTheme
     import androidx.compose.material3.darkColorScheme
     import androidx.compose.material3.lightColorScheme
     import androidx.compose.runtime.Composable

     private val DarkColorPalette = darkColorScheme(
         primary = Purple200,
         primaryContainer = Purple700,
         secondary = Teal200
     )

     private val LightColorPalette = lightColorScheme(
         primary = Purple500,
         primaryContainer = Purple700,
         secondary = Teal200
     )

     @Composable
     fun MyComposeAppTheme(
         darkTheme: Boolean = isSystemInDarkTheme(),
         content: @Composable () -> Unit
     ) {
         val colors = if (darkTheme) {
             DarkColorPalette
         } else {
             LightColorPalette
         }

         MaterialTheme(
             colorScheme = colors,
             typography = Typography,
             shapes = Shapes,
             content = content
         )
     }
     ```

**Verifying Compose setup with a sample project**

1. **Run the app**:
   - Connect your Android device or start an emulator.
   - Click "Run" in Android Studio to build and run your project.

2. **Verify the UI**:
   - If the setup is correct, you should see the text "Hello, Android!" displayed on the screen.
   - You can also check the preview in the Android Studio IDE to ensure the composable functions render correctly.

By completing these steps, you will have a basic Jetpack Compose setup in your project, ready for building more complex UIs.

- **4.1 Adding ViewModel Dependency**
  - Including ViewModel library in your project
  - Updating Gradle files accordingly

- **4.2 Creating and Using ViewModels**
  - Basic ViewModel setup and lifecycle
  - Integrating ViewModels with Jetpack Compose

### Section 4: Integrating ViewModels

#### 4.1 Adding ViewModel Dependency

**Including ViewModel library in your project**

To use ViewModels in your Android project, you need to add the ViewModel library dependency to your project. Here’s how to do it:

1. **Open your project’s `build.gradle` file**:
   - Navigate to the app module directory and open the `build.gradle` file.

2. **Add the ViewModel dependency**:
   - In the `dependencies` section, add the ViewModel library dependency:
     ```groovy
     dependencies {
         implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.1"
         // Other dependencies
     }
     ```

3. **Sync your project with Gradle files**:
   - After adding the dependency, click "Sync Now" in the notification bar to sync your project with the updated Gradle files.

**Updating Gradle files accordingly**

Ensure that your `build.gradle` files are properly configured to include the ViewModel library and other necessary components:

1. **Project-level `build.gradle`**:
   - Verify that the project-level `build.gradle` file includes the required repositories:
     ```groovy
     buildscript {
         repositories {
             google()
             mavenCentral()
         }
         dependencies {
             classpath "com.android.tools.build:gradle:4.2.2"
             classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.21"
         }
     }

     allprojects {
         repositories {
             google()
             mavenCentral()
         }
     }
     ```

2. **App-level `build.gradle`**:
   - Ensure the app-level `build.gradle` file includes the necessary dependencies and configurations:
     ```groovy
     plugins {
         id 'com.android.application'
         id 'org.jetbrains.kotlin.android'
     }

     android {
         compileSdkVersion 30

         defaultConfig {
             applicationId "com.example.mycomposeapp"
             minSdkVersion 21
             targetSdkVersion 30
             versionCode 1
             versionName "1.0"
         }

         buildFeatures {
             compose true
         }

         composeOptions {
             kotlinCompilerExtensionVersion "1.1.0-alpha03"
         }

         kotlinOptions {
             jvmTarget = '1.8'
         }
     }

     dependencies {
         implementation "androidx.core:core-ktx:1.6.0"
         implementation "androidx.appcompat:appcompat:1.3.1"
         implementation "com.google.android.material:material:1.4.0"
         implementation "androidx.compose.ui:ui:1.0.1"
         implementation "androidx.compose.material:material:1.0.1"
         implementation "androidx.compose.ui:ui-tooling-preview:1.0.1"
         implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.3.1"
         implementation "androidx.activity:activity-compose:1.3.1"
         implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.1"
         debugImplementation "androidx.compose.ui:ui-tooling:1.0.1"
     }
     ```

#### 4.2 Creating and Using ViewModels

**Basic ViewModel setup and lifecycle**

1. **Creating a ViewModel**:
   - Create a new Kotlin class for your ViewModel. For example, create `MainViewModel.kt` in the `src/main/java` directory:
     ```kotlin
     package com.example.mycomposeapp

     import androidx.lifecycle.ViewModel
     import androidx.lifecycle.MutableLiveData
     import androidx.lifecycle.LiveData

     class MainViewModel : ViewModel() {
         private val _text = MutableLiveData("Hello, ViewModel!")
         val text: LiveData<String> = _text

         fun updateText(newText: String) {
             _text.value = newText
         }
     }
     ```

2. **ViewModel Lifecycle**:
   - ViewModels are lifecycle-aware, which means they survive configuration changes like screen rotations. This makes them ideal for managing UI-related data that needs to persist across such changes.

**Integrating ViewModels with Jetpack Compose**

1. **Using ViewModel in a Composable function**:
   - In your `MainActivity.kt` or any other composable file, you can use the ViewModel to manage UI state:
     ```kotlin
     package com.example.mycomposeapp

     import android.os.Bundle
     import androidx.activity.ComponentActivity
     import androidx.activity.compose.setContent
     import androidx.compose.foundation.layout.fillMaxSize
     import androidx.compose.material3.MaterialTheme
     import androidx.compose.material3.Surface
     import androidx.compose.material3.Text
     import androidx.compose.runtime.Composable
     import androidx.compose.ui.Modifier
     import androidx.compose.ui.tooling.preview.Preview
     import androidx.lifecycle.viewmodel.compose.viewModel
     import com.example.mycomposeapp.ui.theme.MyComposeAppTheme

     class MainActivity : ComponentActivity() {
         override fun onCreate(savedInstanceState: Bundle?) {
             super.onCreate(savedInstanceState)
             setContent {
                 MyComposeAppTheme {
                     // A surface container using the 'background' color from the theme
                     Surface(
                         modifier = Modifier.fillMaxSize(),
                         color = MaterialTheme.colorScheme.background
                     ) {
                         MyScreen()
                     }
                 }
             }
         }
     }

     @Composable
     fun MyScreen(mainViewModel: MainViewModel = viewModel()) {
         val text = mainViewModel.text.observeAsState("")

         Column {
             Text(text = text.value ?: "")
             Button(onClick = { mainViewModel.updateText("Hello, Jetpack Compose!") }) {
                 Text("Update Text")
             }
         }
     }

     @Preview(showBackground = true)
     @Composable
     fun DefaultPreview() {
         MyComposeAppTheme {
             MyScreen()
         }
     }
     ```

2. **Observing LiveData in Compose**:
   - Use the `observeAsState` extension function to observe `LiveData` from your ViewModel in a composable function. This ensures that the UI reacts to data changes in a lifecycle-aware manner.

By following these steps, you will successfully integrate ViewModels into your Jetpack Compose project, enabling efficient state management and lifecycle awareness in your Android applications.

### Section 5: Implementing Hilt for Dependency Injection

- **5.1 Adding Hilt to Your Project**
  - Including Hilt dependencies in Gradle
  - Configuring Hilt with application class and modules

- **5.2 Using Hilt in Your Project**
  - Injecting dependencies into ViewModels and other components
  - Practical example of Hilt in action

#### 5.1 Adding Hilt to Your Project

**Including Hilt dependencies in Gradle**

To use Hilt for dependency injection in your project, you need to add the necessary dependencies to your Gradle files. Here’s how to do it:

1. **Open your project’s `build.gradle` file**:
   - Navigate to the app module directory and open the `build.gradle` file.

2. **Add Hilt dependencies**:
   - In the `dependencies` section, add the Hilt dependencies:
     ```groovy
     plugins {
         id 'com.android.application'
         id 'org.jetbrains.kotlin.android'
         id 'dagger.hilt.android.plugin'
     }

     android {
         compileSdkVersion 30

         defaultConfig {
             applicationId "com.example.mycomposeapp"
             minSdkVersion 21
             targetSdkVersion 30
             versionCode 1
             versionName "1.0"
         }

         buildFeatures {
             compose true
         }

         composeOptions {
             kotlinCompilerExtensionVersion "1.1.0-alpha03"
         }

         kotlinOptions {
             jvmTarget = '1.8'
         }
     }

     dependencies {
         implementation "androidx.core:core-ktx:1.6.0"
         implementation "androidx.appcompat:appcompat:1.3.1"
         implementation "com.google.android.material:material:1.4.0"
         implementation "androidx.compose.ui:ui:1.0.1"
         implementation "androidx.compose.material:material:1.0.1"
         implementation "androidx.compose.ui:ui-tooling-preview:1.0.1"
         implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.3.1"
         implementation "androidx.activity:activity-compose:1.3.1"
         implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.1"
         implementation "com.google.dagger:hilt-android:2.38.1"
         kapt "com.google.dagger:hilt-android-compiler:2.38.1"
         debugImplementation "androidx.compose.ui:ui-tooling:1.0.1"
     }

     kapt {
         correctErrorTypes = true
     }
     ```

3. **Sync your project with Gradle files**:
   - After adding the dependencies, click "Sync Now" in the notification bar to sync your project with the updated Gradle files.

**Configuring Hilt with application class and modules**

1. **Initialize Hilt in the Application class**:
   - Create or open your `Application` class and annotate it with `@HiltAndroidApp`:
     ```kotlin
     package com.example.mycomposeapp

     import android.app.Application
     import dagger.hilt.android.HiltAndroidApp

     @HiltAndroidApp
     class MyApplication : Application() {
     }
     ```

2. **Create Hilt modules**:
   - Define a Hilt module to provide dependencies. For example, create a `NetworkModule` to provide network-related dependencies:
     ```kotlin
     package com.example.mycomposeapp.di

     import com.example.mycomposeapp.network.ApiService
     import dagger.Module
     import dagger.Provides
     import dagger.hilt.InstallIn
     import dagger.hilt.components.SingletonComponent
     import retrofit2.Retrofit
     import retrofit2.converter.gson.GsonConverterFactory
     import javax.inject.Singleton

     @Module
     @InstallIn(SingletonComponent::class)
     object NetworkModule {

         @Provides
         @Singleton
         fun provideRetrofit(): Retrofit {
             return Retrofit.Builder()
                 .baseUrl("https://api.example.com/")
                 .addConverterFactory(GsonConverterFactory.create())
                 .build()
         }

         @Provides
         @Singleton
         fun provideApiService(retrofit: Retrofit): ApiService {
             return retrofit.create(ApiService::class.java)
         }
     }
     ```

#### 5.2 Using Hilt in Your Project

**Injecting dependencies into ViewModels and other components**

1. **Inject dependencies into a ViewModel**:
   - Create a ViewModel and use Hilt to inject dependencies. Annotate the ViewModel with `@HiltViewModel` and use `@Inject` for the constructor:
     ```kotlin
     package com.example.mycomposeapp

     import androidx.lifecycle.ViewModel
     import androidx.lifecycle.viewModelScope
     import dagger.hilt.android.lifecycle.HiltViewModel
     import kotlinx.coroutines.launch
     import javax.inject.Inject

     @HiltViewModel
     class MainViewModel @Inject constructor(
         private val apiService: ApiService
     ) : ViewModel() {

         fun fetchData() {
             viewModelScope.launch {
                 // Use apiService to fetch data
             }
         }
     }
     ```

2. **Inject dependencies into other components**:
   - You can inject dependencies into activities, fragments, or other components using the `@AndroidEntryPoint` annotation:
     ```kotlin
     package com.example.mycomposeapp

     import android.os.Bundle
     import androidx.activity.ComponentActivity
     import androidx.activity.compose.setContent
     import androidx.hilt.navigation.compose.hiltViewModel
     import dagger.hilt.android.AndroidEntryPoint

     @AndroidEntryPoint
     class MainActivity : ComponentActivity() {
         override fun onCreate(savedInstanceState: Bundle?) {
             super.onCreate(savedInstanceState)
             setContent {
                 MyApp()
             }
         }
     }

     @Composable
     fun MyApp(mainViewModel: MainViewModel = hiltViewModel()) {
         // Use mainViewModel in your composables
     }
     ```

**Practical example of Hilt in action**

To see Hilt in action, let’s create a practical example that demonstrates dependency injection in an Android Compose project:

1. **Create an API service interface**:
   ```kotlin
   package com.example.mycomposeapp.network

   import retrofit2.http.GET

   interface ApiService {
       @GET("endpoint")
       suspend fun fetchData(): Response<Data>
   }
   ```

2. **Implement a ViewModel that uses the ApiService**:
   ```kotlin
   package com.example.mycomposeapp

   import androidx.lifecycle.ViewModel
   import androidx.lifecycle.viewModelScope
   import com.example.mycomposeapp.network.ApiService
   import dagger.hilt.android.lifecycle.HiltViewModel
   import kotlinx.coroutines.launch
   import javax.inject.Inject

   @HiltViewModel
   class MainViewModel @Inject constructor(
       private val apiService: ApiService
   ) : ViewModel() {

       fun fetchData() {
           viewModelScope.launch {
               val data = apiService.fetchData()
               // Handle the fetched data
           }
       }
   }
   ```

3. **Use the ViewModel in a composable function**:
   ```kotlin
   package com.example.mycomposeapp

   import android.os.Bundle
   import androidx.activity.ComponentActivity
   import androidx.activity.compose.setContent
   import androidx.compose.foundation.layout.Column
   import androidx.compose.material3.Button
   import androidx.compose.material3.Text
   import androidx.compose.runtime.Composable
   import androidx.compose.runtime.livedata.observeAsState
   import androidx.hilt.navigation.compose.hiltViewModel
   import dagger.hilt.android.AndroidEntryPoint

   @AndroidEntryPoint
   class MainActivity : ComponentActivity() {
       override fun onCreate(savedInstanceState: Bundle?) {
           super.onCreate(savedInstanceState)
           setContent {
               MyApp()
           }
       }
   }

   @Composable
   fun MyApp(mainViewModel: MainViewModel = hiltViewModel()) {
       Column {
           val data by mainViewModel.data.observeAsState()
           Text(text = data ?: "Loading...")
           Button(onClick = { mainViewModel.fetchData() }) {
               Text("Fetch Data")
           }
       }
   }
   ```

By following these steps, you will have successfully integrated Hilt for dependency injection in your Android project. This setup will allow you to manage dependencies efficiently, leading to a more modular, testable, and maintainable codebase.

### Section 6: Creating a New Project for Database Management

- **6.1 Starting a New Android Project**
  - Step-by-step guide to creating a new project in Android Studio
  - Setting up the project structure

- **6.2 Configuring the Project for Room Database**
  - Adding Room dependencies to Gradle
  - Initial setup and basic configuration for Room

#### 6.1 Starting a New Android Project

**Step-by-step guide to creating a new project in Android Studio**

1. **Open Android Studio**:
   - Launch Android Studio on your development machine.

2. **Create a New Project**:
   - Click on "Start a new Android Studio project".

3. **Choose a Project Template**:
   - Select a project template. For database management, you can start with the "Empty Activity" template.
   - Click "Next".

4. **Configure Your Project**:
   - **Name**: Enter a name for your project (e.g., `DatabaseManagementApp`).
   - **Package name**: Enter a package name (e.g., `com.example.databasemanagement`).
   - **Save location**: Choose a location on your file system where the project will be saved.
   - **Language**: Select "Kotlin".
   - **Minimum API level**: Choose the minimum API level you want to support (e.g., API 21: Android 5.0 Lollipop).
   - Click "Finish" to create the project.

**Setting up the project structure**

1. **Project Structure**:
   - Open the newly created project in Android Studio.
   - Your project structure should look like this:
     ```
     - app
       - manifests
         - AndroidManifest.xml
       - java
         - com.example.databasemanagement
           - MainActivity.kt
       - res
         - layout
           - activity_main.xml
         - values
           - strings.xml
           - themes.xml
     ```

2. **Modify `MainActivity.kt`**:
   - Open `MainActivity.kt` and set up a basic activity:
     ```kotlin
     package com.example.databasemanagement

     import android.os.Bundle
     import androidx.activity.ComponentActivity
     import androidx.activity.compose.setContent
     import androidx.compose.material3.MaterialTheme
     import androidx.compose.material3.Surface
     import com.example.databasemanagement.ui.theme.DatabaseManagementAppTheme

     class MainActivity : ComponentActivity() {
         override fun onCreate(savedInstanceState: Bundle?) {
             super.onCreate(savedInstanceState)
             setContent {
                 DatabaseManagementAppTheme {
                     Surface(color = MaterialTheme.colorScheme.background) {
                         // Your composables go here
                     }
                 }
             }
         }
     }
     ```

3. **Set Up Themes**:
   - Ensure you have a theme set up for your project. You can modify the `themes.xml` files under `res/values` and `res/values-night` for light and dark themes respectively.

#### 6.2 Configuring the Project for Room Database

**Adding Room dependencies to Gradle**

1. **Open `build.gradle` (app module)**:
   - Navigate to the `build.gradle` file in the app module directory.

2. **Add Room dependencies**:
   - In the `dependencies` section, add the Room library dependencies:
     ```groovy
     dependencies {
         implementation "androidx.room:room-runtime:2.4.1"
         kapt "androidx.room:room-compiler:2.4.1"
         implementation "androidx.room:room-ktx:2.4.1"
         // Other dependencies
     }
     ```

3. **Enable Kotlin Annotation Processing**:
   - Add `kapt` plugin at the top of your `build.gradle` file:
     ```groovy
     plugins {
         id 'com.android.application'
         id 'org.jetbrains.kotlin.android'
         id 'kotlin-kapt'
     }
     ```

4. **Sync your project with Gradle files**:
   - Click "Sync Now" in the notification bar to sync your project with the updated Gradle files.

**Initial setup and basic configuration for Room**

1. **Create Entity Class**:
   - Create a data class annotated with `@Entity` to define your database table. For example, create a `User.kt` file:
     ```kotlin
     package com.example.databasemanagement.data

     import androidx.room.Entity
     import androidx.room.PrimaryKey

     @Entity(tableName = "users")
     data class User(
         @PrimaryKey(autoGenerate = true) val id: Int,
         val name: String,
         val age: Int
     )
     ```

2. **Create DAO (Data Access Object)**:
   - Create an interface annotated with `@Dao` to define database operations. For example, create a `UserDao.kt` file:
     ```kotlin
     package com.example.databasemanagement.data

     import androidx.room.Dao
     import androidx.room.Insert
     import androidx.room.Query

     @Dao
     interface UserDao {
         @Insert
         suspend fun insert(user: User)

         @Query("SELECT * FROM users")
         suspend fun getAllUsers(): List<User>
     }
     ```

3. **Create Database Class**:
   - Create an abstract class annotated with `@Database` to define the database configuration. For example, create an `AppDatabase.kt` file:
     ```kotlin
     package com.example.databasemanagement.data

     import androidx.room.Database
     import androidx.room.RoomDatabase

     @Database(entities = [User::class], version = 1)
     abstract class AppDatabase : RoomDatabase() {
         abstract fun userDao(): UserDao
     }
     ```

4. **Initialize the Database**:
   - Initialize the Room database in your application class or a singleton. For example, in `MainActivity.kt`:
     ```kotlin
     package com.example.databasemanagement

     import android.os.Bundle
     import androidx.activity.ComponentActivity
     import androidx.activity.compose.setContent
     import androidx.compose.material3.MaterialTheme
     import androidx.compose.material3.Surface
     import androidx.room.Room
     import com.example.databasemanagement.data.AppDatabase
     import com.example.databasemanagement.ui.theme.DatabaseManagementAppTheme

     class MainActivity : ComponentActivity() {

         private lateinit var database: AppDatabase

         override fun onCreate(savedInstanceState: Bundle?) {
             super.onCreate(savedInstanceState)

             database = Room.databaseBuilder(
                 applicationContext,
                 AppDatabase::class.java, "database-name"
             ).build()

             setContent {
                 DatabaseManagementAppTheme {
                     Surface(color = MaterialTheme.colorScheme.background) {
                         // Your composables go here
                     }
                 }
             }
         }
     }
     ```

By following these steps, you will have a new Android project set up and configured for Room database management, ready for further development and integration of more advanced features.

### Section 7: Verifying the Development Environment

- **7.1 Running Your First Application**
  - Ensuring everything is set up correctly
  - Troubleshooting common issues

- **7.2 Testing Configuration with a Sample Database**
  - Creating a simple Room database
  - Performing basic CRUD operations to test setup

#### 7.1 Running Your First Application

**Ensuring everything is set up correctly**

1. **Build the Project**:
   - In Android Studio, click on "Build" > "Make Project" to ensure that all dependencies are correctly set up and there are no build errors.

2. **Run the Application**:
   - Connect your Android device via USB or start an Android emulator.
   - Click on the "Run" button or go to "Run" > "Run 'app'" in Android Studio.
   - Ensure that the app launches without any issues.

**Troubleshooting common issues**

1. **Gradle Sync Issues**:
   - If you encounter Gradle sync issues, try the following steps:
     - Ensure that you have an active internet connection for Gradle to download the necessary dependencies.
     - Clean and rebuild the project by going to "Build" > "Clean Project" and then "Build" > "Rebuild Project".
     - Check the `build.gradle` files for any syntax errors or missing dependencies.

2. **Compilation Errors**:
   - Check for any red underlines in your code indicating syntax errors or unresolved references.
   - Ensure that all necessary imports are included at the top of your Kotlin files.

3. **Runtime Errors**:
   - If your app crashes on launch, check the Logcat window in Android Studio for error messages.
   - Common issues include missing permissions, incorrect resource references, or null pointer exceptions. Address the specific issues indicated by the error logs.

#### 7.2 Testing Configuration with a Sample Database

**Creating a simple Room database**

To verify that the Room database is set up correctly, you can create a simple database and perform basic CRUD operations:

1. **Entity Class**:
   - Ensure you have an entity class, for example, `User`:
     ```kotlin
     package com.example.databasemanagement.data

     import androidx.room.Entity
     import androidx.room.PrimaryKey

     @Entity(tableName = "users")
     data class User(
         @PrimaryKey(autoGenerate = true) val id: Int,
         val name: String,
         val age: Int
     )
     ```

2. **DAO Interface**:
   - Ensure you have a DAO interface, for example, `UserDao`:
     ```kotlin
     package com.example.databasemanagement.data

     import androidx.room.Dao
     import androidx.room.Insert
     import androidx.room.Query

     @Dao
     interface UserDao {
         @Insert
         suspend fun insert(user: User)

         @Query("SELECT * FROM users")
         suspend fun getAllUsers(): List<User>
     }
     ```

3. **Database Class**:
   - Ensure you have a database class, for example, `AppDatabase`:
     ```kotlin
     package com.example.databasemanagement.data

     import androidx.room.Database
     import androidx.room.RoomDatabase

     @Database(entities = [User::class], version = 1)
     abstract class AppDatabase : RoomDatabase() {
         abstract fun userDao(): UserDao
     }
     ```

**Performing basic CRUD operations to test setup**

1. **Initialize the Database**:
   - In `MainActivity.kt`, ensure that the Room database is initialized:
     ```kotlin
     package com.example.databasemanagement

     import android.os.Bundle
     import androidx.activity.ComponentActivity
     import androidx.activity.compose.setContent
     import androidx.compose.foundation.layout.Column
     import androidx.compose.material3.Button
     import androidx.compose.material3.Text
     import androidx.compose.runtime.Composable
     import androidx.compose.runtime.livedata.observeAsState
     import androidx.compose.runtime.mutableStateOf
     import androidx.compose.runtime.remember
     import androidx.compose.ui.tooling.preview.Preview
     import androidx.lifecycle.LiveData
     import androidx.lifecycle.MutableLiveData
     import androidx.lifecycle.lifecycleScope
     import androidx.room.Room
     import com.example.databasemanagement.data.AppDatabase
     import com.example.databasemanagement.data.User
     import com.example.databasemanagement.ui.theme.DatabaseManagementAppTheme
     import kotlinx.coroutines.Dispatchers
     import kotlinx.coroutines.launch

     class MainActivity : ComponentActivity() {

         private lateinit var database: AppDatabase
         private val usersLiveData = MutableLiveData<List<User>>()

         override fun onCreate(savedInstanceState: Bundle?) {
             super.onCreate(savedInstanceState)

             database = Room.databaseBuilder(
                 applicationContext,
                 AppDatabase::class.java, "database-name"
             ).build()

             setContent {
                 DatabaseManagementAppTheme {
                     val users by usersLiveData.observeAsState(emptyList())

                     Column {
                         users.forEach { user ->
                             Text(text = "${user.name}, ${user.age}")
                         }
                         Button(onClick = { addUser("John Doe", 30) }) {
                             Text("Add User")
                         }
                     }
                 }
             }
         }

         private fun addUser(name: String, age: Int) {
             val user = User(name = name, age = age)
             lifecycleScope.launch(Dispatchers.IO) {
                 database.userDao().insert(user)
                 val users = database.userDao().getAllUsers()
                 usersLiveData.postValue(users)
             }
         }
     }
     ```

2. **Verify CRUD Operations**:
   - Run the app and click the "Add User" button to insert a new user into the database.
   - The user information should be displayed on the screen, indicating that the insert operation worked.
   - The `getAllUsers` query fetches all users from the database and updates the UI.

By following these steps, you can verify that your development environment is correctly set up and that your Room database configuration is functioning as expected. This setup will ensure you are ready to build more complex features in your Android application.

### Section 8: Summary and Next Steps

- **8.1 Recap of Setup Process**
  - Reviewing the steps taken to set up the development environment

- **8.2 Preparing for the Next Chapter**
  - Teaser of the next chapter’s content
  - Suggested exercises to reinforce the setup process

#### 8.1 Recap of Setup Process

In this chapter, we guided you through the essential steps required to set up the development environment for Android development, focusing on Kotlin, Jetpack Compose, ViewModels, and Hilt for dependency injection, along with configuring a Room database for efficient data management. Here's a brief review of the steps taken:

1. **Installing and Configuring Android Studio**:
   - Downloaded and installed Android Studio.
   - Completed the initial setup, including configuring the Android SDK and necessary components.

2. **Configuring Kotlin**:
   - Enabled Kotlin in Android Studio and set it as the default language for new projects.
   - Ensured that the Kotlin plugin and its dependencies were up-to-date.

3. **Setting Up Jetpack Compose**:
   - Added Jetpack Compose dependencies to the project.
   - Created a simple Compose UI to verify the setup.

4. **Integrating ViewModels**:
   - Added ViewModel dependencies to the project.
   - Set up basic ViewModel configurations and integrated them with Jetpack Compose.

5. **Implementing Hilt for Dependency Injection**:
   - Included Hilt dependencies in the project.
   - Configured Hilt with the application class and modules.
   - Injected dependencies into ViewModels and other components.

6. **Creating a New Project for Database Management**:
   - Started a new Android project.
   - Configured the project structure and set up Room database dependencies.
   - Created initial setup and basic configurations for Room.

7. **Verifying the Development Environment**:
   - Ran the first application to ensure the setup was correct.
   - Created a simple Room database and performed basic CRUD operations to test the configuration.

#### 8.2 Preparing for the Next Chapter

**Teaser of the next chapter’s content**

In the next chapter, we will delve deeper into the practical implementation of Room databases in Android applications. We will cover:

1. **Advanced Room Features**:
   - Implementing complex queries, relationships between entities, and data migrations.
   - Using Flow and LiveData with Room for real-time data updates.

2. **Optimizing Performance**:
   - Techniques for optimizing database performance, such as indexing and query optimization.

3. **Testing Room Databases**:
   - Best practices for writing unit tests for your Room database and DAO classes.

4. **Real-world Use Cases**:
   - Building a sample application that demonstrates the advanced use of Room, integrating it with Jetpack Compose and ViewModels.

**Suggested exercises to reinforce the setup process**

To reinforce your understanding of the setup process and prepare for the upcoming chapters, try the following exercises:

1. **Create a To-Do List App**:
   - Set up a new project using Kotlin and Jetpack Compose.
   - Use ViewModels to manage the UI state.
   - Implement a Room database to store to-do items.
   - Use Hilt for dependency injection.

2. **Refactor an Existing Project**:
   - Take an existing Android project and refactor it to use Jetpack Compose for the UI.
   - Introduce ViewModels and Hilt to manage dependencies and state.
   - Add a Room database for data persistence.

3. **Experiment with Database Relationships**:
   - Create a new project and set up a Room database with multiple entities.
   - Implement one-to-many and many-to-many relationships between the entities.
   - Perform CRUD operations to test the relationships and ensure data integrity.

By completing these exercises, you will gain hands-on experience with the technologies and best practices discussed in this chapter, solidifying your knowledge and preparing you for more advanced topics in the next chapter.

