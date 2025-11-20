import { useState, useEffect } from 'react';
interface UseMergedStateProps<T> {
    value?: T, // 受控模式下，value为外部传入的值
    defaultValue?: T | (() => T), // 非受控模式下，defaultValue为内部初始值
    isControlled: boolean
}

export function useMergedState<T>(
    options: UseMergedStateProps<T>
): [T | undefined, (next: T | ((prev: T) => T)) => void] {
    const { value: controlledValue, defaultValue, isControlled } = options;

    // 内部state，用于非受控模式下，初始化内部state的值。
    const [innerValue, setInnerValue] = useState<T | undefined>(() =>{
        // 若为受控模式，则内部state初始值为controlledValue，和value保持一致。
        if(isControlled) {
            return controlledValue;
        }
        // 懒初始化，当defaultValue为函数时，调用函数获取初始值。
        if(typeof defaultValue === 'function') {
            // 虽然if已经判断defaultValue为函数，但是ts无法推断出defaultValue的类型，所以需要进行类型断言。
            return (defaultValue as () => T)();
        }
        // 若为非受控模式，则内部state初始值为defaultValue
        return defaultValue;
    });

    useEffect(() => {
        if (isControlled) {
            setInnerValue(controlledValue);
        }
    }, [isControlled, controlledValue]);

    // 对外暴露的value
    // 当为受控模式时，值为外部props传入的controlledValue
    // 当为非受控模式时，值为内部state值innerValue。
    const mergedValue = isControlled ? controlledValue : innerValue;

    const setMergedValue = (value: T | ((prev: T) => T)) => {
        // 若为非受控模式，则设置内部state值
        // 受控模式时，外部使用onChange方法在外部处理value值
        if (!isControlled) {
            // 支持函数式更新：setState(prev => prev + 1)
            // 也支持直接值更新：setState(newValue)
            if (typeof value === 'function') {
                setInnerValue((prev) => {
                    // 函数式更新，但需要处理 prev 可能为 undefined 的情况
                    // (value as (prev: T) => T)等价于const fn = (value as (prev: T) => T);
                    // 如fn = prev => prev + 1
                    // return fn(prev as T)
                    return (value as (prev: T | undefined) => T)(prev);
                });
            } else {
                setInnerValue(value);
            }
        }
    }

    return [mergedValue, setMergedValue];
}