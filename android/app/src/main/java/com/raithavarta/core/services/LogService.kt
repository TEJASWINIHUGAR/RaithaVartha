package com.raithavarta.core.services

import android.util.Log

class LogService {

    fun info(message: String) {
        Log.i("RaithaVarta", message)
    }

    fun warn(message: String) {
        Log.w("RaithaVarta", message)
    }

    fun error(message: String) {
        Log.e("RaithaVarta", message)
    }
}
