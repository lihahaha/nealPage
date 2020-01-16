/**
 * 定义迭代器组件。
 *
 * @file      util/Iterator.js
 */

export default class Iterator {
    /**
     * 无条件遍历整个数组或对象。
     */
    static each(obj, cb, $this) {
        /* eslint-disable no-param-reassign */
        $this = $this || {};
        /* eslint-enable no-param-reassign */
        let ii;
        if (obj instanceof Array) {
            if (obj.forEach) return obj.forEach(cb, $this);
            for (ii = 0; ii < obj.length; ii++) {
                if (cb) cb.call($this, obj[ii], ii, obj);
            }
        } else {
            for (ii in obj) {
                if ({}.hasOwnProperty.call(obj, ii)) {
                    if (cb) cb.call($this, obj[ii], ii, obj);
                }
            }
        }
        return undefined;
    }

    /**
     * 遍历数组或对象至第一次失败。
     */
    static every(obj, cb, $this) {
        /* eslint-disable no-param-reassign */
        $this = $this || {};
        /* eslint-enable no-param-reassign */
        let ii;
        if (obj instanceof Array) {
            if (obj.every) return obj.every(cb, $this);
            for (ii = 0; ii < obj.length; ii++) {
                if (!cb.call($this, obj[ii], ii, obj)) return false;
            }
        } else {
            for (ii in obj) {
                if ({}.hasOwnProperty.call(obj, ii)
                    && !cb.call($this, obj[ii], ii, obj)) return false;
            }
        }
        return true;
    }

    /**
     * 遍历数组或对象至第一次成功。
     */
    static some(obj, cb, $this) {
        /* eslint-disable no-param-reassign */
        $this = $this || {};
        /* eslint-enable no-param-reassign */
        let ii;
        if (obj instanceof Array) {
            if (obj.some) return obj.some(cb, $this);
            for (ii = 0; ii < obj.length; ii++) {
                if (cb.call($this, obj[ii], ii, obj)) return true;
            }
        } else {
            for (ii in obj) {
                if ({}.hasOwnProperty.call(obj, ii)
                    && cb.call($this, obj[ii], ii, obj)) return true;
            }
        }
        return false;
    }

    /**
     * 定位子元素。
     */
    static indexOf(obj, item, offset = 0) {
        let ii;
        if (obj instanceof Array) {
            if (obj.indexOf) return obj.indexOf(item, offset);
            for (ii = offset; ii < obj.length; ii++) {
                if (obj[ii] === item) return ii;
            }
        } else {
            for (ii in obj) {
                if ({}.hasOwnProperty.call(obj, ii) && obj[ii] === item) return ii;
            }
        }
        return -1;
    }
}
