/**
 *
 * @param prefix route prefix
 * ```
 * @RoutePrefix("/api/users")
 * class UserController {}
 * ```
 */
export declare function RoutePrefix(prefix: string): (target: any) => void;
/**
 * http method
 */
export declare const Get: (template: string) => (target: any, methodName: string, descriptor: PropertyDescriptor) => void;
export declare const Post: (template: string) => (target: any, methodName: string, descriptor: PropertyDescriptor) => void;
export declare const Put: (template: string) => (target: any, methodName: string, descriptor: PropertyDescriptor) => void;
export declare const Delete: (template: string) => (target: any, methodName: string, descriptor: PropertyDescriptor) => void;
export declare const Patch: (template: string) => (target: any, methodName: string, descriptor: PropertyDescriptor) => void;
/**
 * parameters from
 */
export declare const Path: (paramName: string, type?: "number" | "boolean" | undefined) => (target: any, methodName: string, parameterIndex: number) => void;
export declare const Query: (paramName: string, type?: "number" | "boolean" | undefined) => (target: any, methodName: string, parameterIndex: number) => void;
export declare const Body: (paramName: string, type?: "number" | "boolean" | undefined) => (target: any, methodName: string, parameterIndex: number) => void;
export declare const Header: (paramName: string, type?: "number" | "boolean" | undefined) => (target: any, methodName: string, parameterIndex: number) => void;
export declare const Cookie: (paramName: string, type?: "number" | "boolean" | undefined) => (target: any, methodName: string, parameterIndex: number) => void;
