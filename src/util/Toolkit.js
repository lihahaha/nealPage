/**
 * 定义工具组件。
 *
 * @file      util/ToolKit.js
 */

import Iterator from './Iterator';

export default class Toolkit {
    /**
     * 深拷贝。
     */
    static clone(orig) {
        // if (typeof orig !== 'object') return orig;
        // if (orig instanceof Array) return orig.slice(0);
        // const dolly = {};
        // Iterator.each(orig, (value, key) => {
        //     dolly[key] = value;
        // });
        // return dolly;
        return JSON.parse(JSON.stringify(orig));
    }

    /**
     * 判断对象或数组是否为空。
     */
    static isEmpty(obj) {
        if (obj instanceof Array) {
            return obj.length === 0;
        }
        if (obj instanceof Object) {
            for (const ii in obj) {
                if ({}.hasOwnProperty.call(obj, ii)) {
                    return false;
                }
            }
            return true;
        }
        if (typeof obj === 'string') {
            return obj.replace(/(^\s*)|(\s*$)/g, '') === '';
        }
        return obj === null || obj === undefined;
    }

    /**
     *  去除对象中空数据,用于向服务器传指，过滤空数据
     */
    static filterEmptyData(obj) {
        const object = { ...obj };
        Iterator.each(object, (v, k) => {
            if (Toolkit.isEmpty(v)) {
                Reflect.deleteProperty(object, k);
            }
        });
        return object;
    }

    /**
     * 判断对象或数组是否不为空。
     */
    static isSet(obj) {
        return !Toolkit.isEmpty(obj);
    }

    /**
     * 生成随机数，如果最小数大于最大数，则会调换。
     * @param min int 最小数
     * @param max int 最大数
     */
    static random(min, max) {
        if (min > max) {
            const i = min;
            /* eslint-disable no-param-reassign */
            min = max;
            max = i;
            /* eslint-enable no-param-reassign */
        }
        return min + (Math.random() * (max - min));
    }

    /**
     * 格式化时间。
     * @param time int timestamp
     */
    static dateFormat(time) {
        if (this.isEmpty(time)) return null;
        const date = new Date(time);
        return date.toLocaleString();
    }

    /**
     * 解析日期。
     * @param dateStr string YYYY-MM-DD的日期
     * @return Date 根据字符串解析出来的日期对象
     */
    static dateParse(dateStr) {
        if (Toolkit.isEmpty(dateStr)) return new Date();
        const dateArr = dateStr.split('-');
        const date = new Date();
        date.setFullYear(dateArr[0]);
        date.setMonth(dateArr[1] - 1);
        date.setDate(dateArr[2]);
        return date;
    }

    /**
     * 将格林威治时间转成时间。
     * @param timestamp int timestamp
     */
    static utcToTime(timestamp) {
        const date = new Date(timestamp);
        let hours = date.getHours();
        hours = hours < 10 ? `0${hours}` : hours;
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        let seconds = date.getSeconds();
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${hours}:${minutes}:${seconds}`;
    }

    /**
     * 将格林威治时间转成日期。
     * @param timestamp int timestamp
     */
    static utcToDate(timestamp) {
        const date = new Date(timestamp);
        let month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let day = date.getDate();
        day = day < 10 ? `0${day}` : day;
        return `${date.getFullYear()}-${month}-${day}`;
    }

    /**
     * 获取屏幕的像素点比例。
     * @param ctx CanvasRenderingContext2D 获取像素比例的canvas上下文对象
     */
    static getPixelRatio(ctx) {
        const backingStore = ctx.backingStorePixelRatio ||
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }

    /**
     * 获取raf对象
     * @return window.RequestAnimationFrame
     */
    static getRaf() {
        return window.requestAnimationFrame || window.msRequestAnimationFrame
        || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame;
    }

    /**
     * 获取craf对象。
     * @return window.cancelAnimationFrame
     */
    static getCraf() {
        return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    }

    /* eslint-disable */
    static debounce(action, delay) {
        if (typeof action !== 'function') {
            console.warn('debounce receive a param not function');
            return action;
        }
        delay = +delay || 800;
        let last;
        return function () {
            let ctx = this,
                    args = arguments;
            if (last) {
                clearTimeout(last);
            }
            last = setTimeout(() => {
                action.apply(ctx, args);
            }, delay);
        };
    }
}
