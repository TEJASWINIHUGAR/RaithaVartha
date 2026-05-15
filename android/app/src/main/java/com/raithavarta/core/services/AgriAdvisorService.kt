package com.raithavarta.core.services

class AgriAdvisorService {

    fun getCropAdvice(crop: String): String {
        return "Best practice for $crop: use organic fertilizer"
    }

    fun getWeatherAdvice(): String {
        return "Avoid spraying before rainfall"
    }

    fun getPestControlAdvice(): String {
        return "Use neem-based pesticide for pests"
    }
}
