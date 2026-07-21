"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>
>(function SelectGroup(props, ref) {
  return <SelectPrimitive.Group ref={ref} data-slot="select-group" {...props} />
})

const SelectValue = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(function SelectValue(props, ref) {
  return <SelectPrimitive.Value ref={ref} data-slot="select-value" {...props} />
})

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default"
  }
>(function SelectTrigger({ className, size = "default", children, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-2 rounded-[5px] border border-border bg-background px-2.5 text-[13px] whitespace-nowrap outline-none transition-colors",
        "hover:border-foreground/25 focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25",
        "data-[placeholder]:text-muted-foreground/70 data-[size=default]:h-8 data-[size=sm]:h-7",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="flex shrink-0 items-center opacity-50">
        <ChevronDownIcon className="size-3.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

function SelectContent({
  className,
  children,
  side,
  align = "center",
  sideOffset = 4,
  alignOffset,
  alignItemWithTrigger = true,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof SelectPrimitive.Positioner>,
    "side" | "sideOffset" | "align" | "alignOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "relative isolate z-50 max-h-(--available-height) min-w-[9rem] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[8px] border border-border bg-popover text-popover-foreground shadow-floating transition-[transform,scale,opacity] data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-[5px] py-1.5 pr-8 pl-2 text-[12.5px] outline-hidden select-none data-highlighted:bg-foreground data-highlighted:text-background data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&_svg:not([class*='text-'])]:text-current *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-3.5" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 flex w-full cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 flex w-full cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}

