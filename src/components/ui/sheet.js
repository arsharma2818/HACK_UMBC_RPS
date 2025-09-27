import React from 'react';
import { cn } from '../../utils';

const SheetContext = React.createContext();

const Sheet = React.forwardRef(({ className, open, onOpenChange, ...props }, ref) => (
  <SheetContext.Provider value={{ open, onOpenChange }}>
    <div ref={ref} className={cn("", className)} {...props} />
  </SheetContext.Provider>
));
Sheet.displayName = "Sheet";

const SheetTrigger = React.forwardRef(({ asChild, ...props }, ref) => {
  const context = React.useContext(SheetContext);
  
  if (asChild) {
    return React.cloneElement(props.children, {
      onClick: () => context.onOpenChange(true),
      ref
    });
  }
  
  return (
    <button
      ref={ref}
      onClick={() => context.onOpenChange(true)}
      {...props}
    />
  );
});
SheetTrigger.displayName = "SheetTrigger";

const SheetContent = React.forwardRef(({ className, side = "right", ...props }, ref) => {
  const context = React.useContext(SheetContext);
  
  if (!context.open) {
    return null;
  }
  
  const sideClasses = {
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    top: "inset-x-0 top-0 border-b",
    bottom: "inset-x-0 bottom-0 border-t"
  };
  
  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
        sideClasses[side],
        className
      )}
      {...props}
    />
  );
});
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
