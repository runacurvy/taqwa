import {forwardRef,type ComponentPropsWithoutRef} from "react";
const Link=forwardRef<HTMLAnchorElement,ComponentPropsWithoutRef<"a">>(function Link(props,ref){return <a ref={ref} {...props}/>});
export default Link;
