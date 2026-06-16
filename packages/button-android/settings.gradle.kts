pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
    plugins {
        id("com.android.library") version "8.3.2"
        id("org.jetbrains.kotlin.android") version "1.9.23"
        id("org.jlleitschuh.gradle.ktlint") version "12.1.1"
        id("io.gitlab.arturbosch.detekt") version "1.23.6"
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "button-android"
