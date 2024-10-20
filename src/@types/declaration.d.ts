declare module 'stylis-plugin-rtl';
declare module "*.jpg"
declare module '*.png' {
    const value: string;
    export default value;
  }
declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.
     */
    interface RoutesType {
        name: string;
        layout: string;
        component: ReactNode;
        icon: JSX.Element | string;
        path: string;
        secondary?: boolean;
    }
}
export {};
