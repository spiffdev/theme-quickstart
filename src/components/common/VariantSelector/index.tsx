import React, { useCallback, useEffect, useState } from "react";
import { faCheckCircle, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Variant } from "@spiffcommerce/core";

export const GridVariantSelector: React.FC<{
    onVariantChanged: (v: Variant) => void;
    selectedVariantId?: string;
    variants: Variant[];
}> = (props) => {
    const { onVariantChanged, selectedVariantId, variants } = props;

    return (
        <div className="tw-grid tw-grid-cols-2 tw-gap-2">
            {variants.map((v) => {
                const selected = selectedVariantId == v.getId();
                return (
                    <VariantButton
                        key={v.getId()}
                        onVariantChanged={onVariantChanged}
                        selected={selected}
                        variant={v}
                    />
                );
            })}
        </div>
    );
};

export const HorizontalVariantSelector: React.FC<{
    onVariantChanged: (v: Variant) => void;
    selectedVariantId?: string;
    variants: Variant[];
}> = (props) => {
    const { onVariantChanged, selectedVariantId, variants } = props;

    return (
        <div className="tw-flex">
            <div className="tw-flex tw-h-[60px]">
                {variants.map((v) => {
                    const selected = selectedVariantId == v.getId();
                    return (
                        <VariantButton
                            key={v.getId()}
                            onVariantChanged={onVariantChanged}
                            selected={selected}
                            variant={v}
                        />
                    );
                })}
            </div>
        </div>
    );
};

/**
 * Show 4 variants at a time vertically.
 */
export const VerticalVariantSelector: React.FC<{
    onVariantChanged: (v: Variant) => void;
    selectedVariantId?: string;
    variants: Variant[];
}> = (props) => {
    const { onVariantChanged, selectedVariantId, variants } = props;
    const [hidden, setHidden] = useState(false);
    const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);

    const [mayScrollPrev, setMayScrollPrev] = useState(false);
    const [mayScrollNext, setMayScrollNext] = useState(false);

    const maxSlots = 4;

    useEffect(() => {
        if (variants.length > maxSlots) {
            setMayScrollNext(true);
        }
    }, [variants]);

    const scrollPrev = useCallback(() => {
        const newIndex = firstVisibleIndex - 1;
        setFirstVisibleIndex(newIndex);
        if (newIndex <= 0) {
            setMayScrollPrev(false);
        } else {
            setMayScrollPrev(true);
        }
        if (newIndex + maxSlots < variants.length) {
            setMayScrollNext(true);
        } else {
            setMayScrollNext(false);
        }
    }, [firstVisibleIndex, variants]);

    const scrollNext = useCallback(() => {
        const newIndex = firstVisibleIndex + 1;
        setFirstVisibleIndex(newIndex);
        if (newIndex <= 0) {
            setMayScrollPrev(false);
        } else {
            setMayScrollPrev(true);
        }
        if (newIndex + maxSlots < variants.length) {
            setMayScrollNext(true);
        } else {
            setMayScrollNext(false);
        }
    }, [firstVisibleIndex, variants]);

    const toggleHide = useCallback(() => {
        setHidden(!hidden);
    }, [hidden]);

    return (
        <>
            <p
                onClick={toggleHide}
                className="tw-inline-block lg:tw-hidden"
                style={{
                    color: "white",
                    cursor: "pointer",
                    fontSize: "12px",
                    marginBottom: "15px",
                    textDecoration: "underline",
                }}
            >
                {hidden ? "Show menu" : "Hide menu"}
            </p>
            {!hidden && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        style={{ color: "#fff", paddingBottom: 7, visibility: mayScrollPrev ? undefined : "hidden" }}
                        onClick={scrollPrev}
                    />
                    <div>
                        {variants.slice(firstVisibleIndex, firstVisibleIndex + maxSlots).map((v) => {
                            const selected = selectedVariantId == v.getId();
                            return (
                                <VariantButton
                                    key={v.getId()}
                                    onVariantChanged={onVariantChanged}
                                    selected={selected}
                                    variant={v}
                                />
                            );
                        })}
                    </div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{ color: "#fff", paddingTop: 7, visibility: mayScrollNext ? undefined : "hidden" }}
                        onClick={scrollNext}
                    />
                </div>
            )}
        </>
    );
};

const VariantButton: React.FC<{
    onVariantChanged: (v: Variant) => void;
    selected: boolean;
    variant: Variant;
}> = (props) => {
    const { onVariantChanged, selected, variant } = props;
    const thumbnail = variant.getThumbnail();

    const activeCircle = "!tw-border-[#F23064]";

    return (
        <div
            onClick={() => onVariantChanged(variant)}
            style={{
                aspectRatio: "1",
                backgroundColor: selected ? "#fff" : "rgba(91, 91, 91, 0.5)",
                border: "2px solid transparent",
                borderRadius: "10px",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s linear",
            }}
            className={`${selected && activeCircle}`}
        >
            {selected && (
                <div className="tw-absolute  -tw-right-[8px] -tw-top-[8px] tw-rounded">
                    <FontAwesomeIcon icon={faCheckCircle} className="tw-text-[#F23064] tw-bg-[#ffffff] tw-rounded-lg" />
                </div>
            )}
            <div
                style={{
                    padding: selected ? 0 : 2,
                    position: "relative",
                    left: selected ? 10 : 0,
                    top: 0,
                    transition: "all 0.2s linear",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <img
                    src={thumbnail}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                    }}
                />
            </div>
        </div>
    );
};
