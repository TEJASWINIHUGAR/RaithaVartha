package com.raithavarta.core.utils

class ConfigManager {

    fun getAppMode(): String {
        return "Production"
    }

    fun getRegion(): String {
        return "India"
    }

    fun isDebugMode(): Boolean {
        return false
    }

    fun getApiStatus(): String {
        return "Connected"
    }
}
