import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Button } from "./button";

export interface CollapsibleProps {
  buttonText: string;
  children: React.ReactNode;
}

const CollapsibleComponent = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ buttonText, children }, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Collapsible.Root ref={ref} open={open} onOpenChange={setOpen}>
        <div
          className="center text-center flex justify-between"
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "space-between",
          // }}
        >
          <Collapsible.Trigger asChild>
            <Button>{buttonText}</Button>
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content>{children}</Collapsible.Content>
      </Collapsible.Root>
    );
  }
);
CollapsibleComponent.displayName = "Collapsible";

export { CollapsibleComponent };
