/// <reference types="react" />
import { Method, Progress, VisitOptions } from "@inertiajs/core";
import React from "react";
import { AxiosResponse } from "axios";
// Copied from https://gist.github.com/balthild/1f23725059aef8b9231d6c346494b918
// which was copied from https://twitter.com/diegohaz/status/1309489079378219009
type PathImpl<T, K extends keyof T> = K extends string ? T[K] extends Record<string, any> ? T[K] extends ArrayLike<any> ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}` : K | `${K}.${PathImpl<T[K], keyof T[K]>}` : K : never;
type Path<T> = PathImpl<T, keyof T> | Extract<keyof T, string>;
type PathValue<T, P extends Path<Required<T>>> = P extends `${infer K}.${infer Rest}` ? K extends keyof Required<T> ? Rest extends Path<Required<T>[K]> ? PathValue<Required<T>[K], Rest> : never : never : P extends keyof Required<T> ? Required<T>[P] : never;
type OnChangeCallback = (key: string | undefined, value: unknown, prev: unknown) => void;
type NestedObject = {
    [key: string]: unknown | NestedObject | NestedObject[];
};
type setDataByPath<TForm> = <P extends Path<TForm>>(key: P, value: PathValue<TForm, P>) => void;
type setDataByString = (key: string, value: unknown) => void;
type setDataByObject<TForm> = (data: TForm) => void;
type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void;
type getDataByPath<TForm> = <P extends Path<TForm>>(key: P) => PathValue<TForm, P>;
type getDataByString = (key: string) => unknown;
type unsetDataByPath<TForm> = (key: Path<TForm>) => void;
type unsetDataByString = (key: string) => void;
type resetAll = () => void;
type resetByPath<TForm> = (field: Path<TForm> | Path<TForm>[]) => void;
type resetByString = (field: string | string[]) => void;
type setErrorByPath<TForm> = (field: Path<TForm>, value: string | string[]) => void;
type setErrorByString = (field: string, value: string | string[]) => void;
type setErrorByObject = (errors: Record<string, string | string[]>) => void;
type getErrorByPath<TForm> = (field: Path<TForm>) => string | string[] | undefined;
type getErrorByString = (field: string) => string | string[] | undefined;
type clearAllErrors = () => void;
type clearErrorsByPath<TForm> = (field: Path<TForm> | Path<TForm>[]) => void;
type clearErrorsByString = (field: string | string[]) => void;
interface UseInertiaFormProps<TForm> {
    data: TForm;
    isDirty: boolean;
    errors: Partial<Record<keyof TForm, string | string[]>>;
    hasErrors: boolean;
    processing: boolean;
    progress: Progress | null;
    wasSuccessful: boolean;
    recentlySuccessful: boolean;
    setData: setDataByObject<TForm> & setDataByMethod<TForm> & setDataByPath<TForm> & setDataByString;
    getData: getDataByPath<TForm> & getDataByString;
    unsetData: unsetDataByPath<TForm> & unsetDataByString;
    transform: (callback: (data: TForm) => TForm) => void;
    onChange: (callback: OnChangeCallback) => void;
    setDefaults(): void;
    setDefaults(field: string, value: string): void;
    setDefaults(fields: TForm): void;
    reset: resetAll & resetByPath<TForm> & resetByString;
    clearErrors: clearAllErrors & clearErrorsByPath<TForm> & clearErrorsByString;
    setError: setErrorByPath<TForm> & setErrorByString & setErrorByObject;
    getError: getErrorByPath<TForm> & getErrorByString;
    submit: (method: Method, url: string, options?: VisitOptions) => void;
    get: (url: string, options?: VisitOptions) => void;
    patch: (url: string, options?: VisitOptions) => void;
    post: (url: string, options?: VisitOptions) => void;
    put: (url: string, options?: VisitOptions) => void;
    delete: (url: string, options?: VisitOptions) => void;
    cancel: () => void;
}
declare function useInertiaForm<TForm>(initialValues?: TForm): UseInertiaFormProps<TForm>;
declare function useInertiaForm<TForm>(rememberKey: string, initialValues?: TForm): UseInertiaFormProps<TForm>;
type InputStrategy = (name: string, model?: string) => {
    inputId: string;
    inputName: string;
};
interface UseInertiaInputProps {
    name: string;
    model?: string;
    errorKey?: string;
    strategy?: InputStrategy;
}
type HTTPVerb = "post" | "put" | "get" | "patch" | "delete";
interface UseFormProps<TForm = NestedObject> extends UseInertiaFormProps<TForm> {
    model?: string;
    method: HTTPVerb;
    to?: string;
    submit: () => Promise<AxiosResponse<any> | UseInertiaFormProps<TForm> | void>;
}
declare const useForm: <T extends unknown = unknown>() => UseFormProps<T>;
type PartialHTMLForm = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onChange" | "onSubmit" | "onError">;
interface FormProps<TForm> extends PartialHTMLForm {
    data: TForm;
    model?: string;
    method?: HTTPVerb;
    to: string;
    async?: boolean;
    resetAfterSubmit?: boolean;
    remember?: boolean;
    railsAttributes?: boolean;
    filter?: string[];
    onSubmit?: (form: UseFormProps<TForm>) => boolean | void;
    onChange?: (form: UseFormProps<TForm>) => void;
    onSuccess?: (form: UseFormProps<TForm>) => void;
    onError?: (form: UseFormProps<TForm>) => void;
}
declare const WrappedForm: <TForm extends Partial<NestedObject>>({ children, model, railsAttributes, ...props }: FormProps<TForm>) => JSX.Element;
/**
 * Returns form data and input specific methods to use with an input.
 */
declare const useInertiaInput: <T = string | number>({ name, model, errorKey, strategy }: UseInertiaInputProps) => {
    form: UseFormProps<unknown>;
    inputName: string;
    inputId: string;
    value: T;
    setValue: (value: T) => void;
    error: string | string[];
};
interface DynamicInputsProps {
    model?: string;
    emptyData: Record<string, unknown>;
}
type DynamicInputsReturn = {
    addInput: () => void;
    removeInput: (i: number) => void;
    paths: string[];
};
declare const useDynamicInputs: ({ model, emptyData }: DynamicInputsProps) => DynamicInputsReturn;
interface NestedFieldsProps {
    children: React.ReactNode | React.ReactElement[];
    model: string;
}
declare const NestedFields: ({ children, model }: NestedFieldsProps) => JSX.Element;
interface DynamicInputsProps$0 {
    children: React.ReactNode;
    model?: string;
    emptyData: Record<string, unknown>;
    addInputButton?: JSX.Element;
    removeInputButton?: JSX.Element;
}
declare const DynamicInputs: ({ children, model, emptyData, addInputButton, removeInputButton }: DynamicInputsProps$0) => JSX.Element;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    component?: string | React.ComponentType;
    requiredFields?: string[];
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>>;
declare const Submit: typeof _default;
declare const __default$0: typeof Submit;
export { useInertiaForm, UseInertiaFormProps, NestedObject, useInertiaInput, useDynamicInputs, WrappedForm as Form, useForm, HTTPVerb, UseFormProps, FormProps, NestedFields, NestedFieldsProps, DynamicInputs, DynamicInputsProps$0 as DynamicInputsProps, __default$0 as Input, __default$0 as Submit };
