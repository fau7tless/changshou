// 导入fox libs
import { foxUI } from '@/assets/libs/fox-libs'
/**
 * 判断日期是否在范围内
 * @param date
 * @param startDate
 * @param span 允许负数
 */
export function inScope4Day(date, startDate, span) {
    return foxUI.inScope4Day(date, startDate, span)
}

/**
 * 判断日期是否在范围内
 * @param date
 * @param startDate
 * @param span
 */
export function inScope4Month(date, startDate, span) {
    return foxUI.inScope4Month(date, startDate, span)
}

/**
 * 获取当前月(当前月(1日, 0时， 0分))
 */
export function getCurrentMonth() {
    return foxUI.getCurrentMonth()
}

/**
 * 获取当前日(当前月(0时， 0分))
 */
export function getCurrentDay() {
    return foxUI.getCurrentDay()
}