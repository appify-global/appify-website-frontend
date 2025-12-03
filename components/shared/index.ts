/**
 * Shared Components
 * 
 * Components that are used across multiple pages.
 * Changes here affect all pages that use them.
 */

// Layout elements
export { ScrollIndicator, default as ScrollIndicatorDefault } from "./ScrollIndicator";

// Re-export Navbar and Footer from their original locations
export { default as Navbar } from "../Navbar/Navbar";
export { default as Footer } from "../Footer/Footer";

// Re-export commonly used UI components
export { default as DotButton } from "../ui/DotButton";
export { default as Button } from "../ui/Button";

// Re-export shared icons
export { PlusIcon, PlusIconRow } from "../Icons/PlusIcon";


