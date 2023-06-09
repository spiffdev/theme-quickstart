import React from "react";
import { ColorOption } from "@spiffcommerce/core";
import { useState } from "react";

export const ColorGallery: React.FC<{
    columnCount?: number;
    colors: ColorOption[];
    onColorSelected: (selection: ColorOption) => void;
    selectedFill?: string;
}> = ({ columnCount, colors, onColorSelected, selectedFill }) => {
    const columns = columnCount ? columnCount : 3;

    return (
        <div
            className=" tw-max-h-[30px]  "
            style={{
                display: "flex",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                columnGap: 14,
                rowGap: 14,
                scrollBehavior: "smooth",
            }}
        >
            {colors.map((color) => {
                return (
                    <ColorGalleryItem
                        key={color.variant?.id}
                        onClick={() => onColorSelected(color)}
                        selected={selectedFill === color.fill}
                        fill={color.fill}
                    />
                );
            })}
        </div>
    );
};

const ColorGalleryItem: React.FC<{
    onClick: () => void;
    selected: boolean;
    fill?: string;
}> = ({ onClick, selected, fill }) => {
    const [over, setOver] = useState(false);

    return (
        <div
            className="lg:tw-w-[30px] tw-w-[30px] lg:tw-outline-offset-2 tw-outline-offset-0 "
            onMouseEnter={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
            onClick={onClick}
            style={{
                aspectRatio: "1",
                backgroundColor: fill,
                borderRadius: "50%",
                boxShadow: `0px 0px 16px rgba(0, 0, 0, 0.16)`,
                cursor: "pointer",
                outline: selected || over ? `1px solid #FFFFFF` : undefined,
                position: "relative",
            }}
        />
    );
};
