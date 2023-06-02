import React, { useCallback, useEffect, useState } from "react";
import { faCheckCircle, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Variant } from "@spiffcommerce/core";

export const GridVariantSelector: React.FC<{
    onVariantChanged: (v: Variant) => void;
    selectedVariantId?: string;
    variants: Variant[];
    checkFont?: boolean;
}> = (props) => {
    const { onVariantChanged, selectedVariantId, variants, checkFont = true } = props;

    return (
        <div>
            <div className={`tw-grid ${checkFont ? "tw-grid-cols-2 " : "tw-grid-cols-3  "} tw-gap-[10px]  `}>
                {variants.map((v) => {
                    const selected = selectedVariantId == v.getId();
                    return (
                        <VariantButton
                            checkFont={checkFont}
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

export const HorizontalVariantSelector: React.FC<{
    checkFont?: boolean;
    onVariantChanged: (v: Variant) => void;
    selectedVariantId?: string;
    variants: Variant[];
}> = (props) => {
    const { onVariantChanged, selectedVariantId, variants, checkFont } = props;

    return (
        <div className="tw-flex">
            <div className="tw-flex ">
                {variants.map((v) => {
                    const selected = selectedVariantId == v.getId();
                    return (
                        <div className="lg:tw-mr-0 tw-mr-[14px] ssm:tw-mr-[14px] sssm:tw-mr-[10px]">
                            <VariantButton
                                checkFont={checkFont}
                                key={v.getId()}
                                onVariantChanged={onVariantChanged}
                                selected={selected}
                                variant={v}
                            />
                        </div>
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
    const [hieght, setHieght] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const maxSlots = screen.height < 750 ? 3 : screen.height < 500 ? 2 : 4;
    useEffect(() => {
        function handlerH() {
            setHieght(window.innerHeight);
            // setHieght(window.innerWidth);
        }
        window.addEventListener("resize", handlerH);

        return () => window.removeEventListener("resize", handlerH);
    }, []);
    useEffect(() => {
        function handlerW() {
            setWidth(window.innerWidth);
            // setHieght(window.innerWidth);
        }
        window.addEventListener("resize", handlerW);

        return () => window.removeEventListener("resize", handlerW);
    }, []);

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

    useEffect(() => {}, []);

    return (
        <>
            <p
                onClick={toggleHide}
                className="tw-inline-block   tw-font-light tw-leading-[20px] lg:tw-hidden"
                style={{
                    WebkitTapHighlightColor: "transparent",
                    paddingTop: "15px",
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingRight: "15px",
                        overflow: "hidden",
                        height: maxSlots === 3 ? "390px" : "450px",
                        width: "90px",
                    }}
                >
                    {mayScrollPrev && (
                        <FontAwesomeIcon
                            className="tw-text-[27px]"
                            icon={faChevronUp}
                            style={{
                                color: "#fff",
                                paddingBottom: 7,
                                visibility: mayScrollPrev ? undefined : "hidden",
                            }}
                            onClick={scrollPrev}
                        />
                    )}
                    <div className={`lg:tw-mb-0  ${mayScrollPrev ? "" : "tw-pt-[5px] "}`}>
                        {variants.slice(firstVisibleIndex, firstVisibleIndex + maxSlots).map((v) => {
                            const selected = selectedVariantId == v.getId();
                            return (
                                <div className="tw-py-[7.5px]  tw-mr-[10px] ">
                                    <VariantButton
                                        key={v.getId()}
                                        onVariantChanged={onVariantChanged}
                                        selected={selected}
                                        variant={v}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <FontAwesomeIcon
                        className="tw-text-[27px]"
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
    classCSS?: string;
    checkFont?: boolean;
    onVariantChanged: (v: Variant) => void;
    selected: boolean;
    variant: Variant;
}> = (props) => {
    const { onVariantChanged, selected, variant, checkFont = true } = props;
    const thumbnail = variant.getThumbnail();

    const activeCircle = "  tw-border tw-border-solid-[1px] !tw-border-[#FF6D88]";

    return (
        <div
            onClick={() => onVariantChanged(variant)}
            style={{
                border: "1px splid transparent",
                aspectRatio: "1",
                backgroundColor: selected ? "#fff" : checkFont ? "rgba(91, 91, 91, 0.5)" : "",
                borderRadius: "10px",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.2s linear",
            }}
            className={`tw-transition-all tw-duration-300 tw-ease-in-out ${selected && activeCircle} ${
                checkFont ? "tw-w-[82px] tw-h-[82px]" : "tw-w-[62.73px]  tw-h-[62.73px] "
            }`}
        >
            {selected && checkFont && (
                <div
                    style={{
                        zIndex: 10,
                    }}
                    className="tw-absolute  -tw-right-[8px] -tw-top-[8px] tw-rounded "
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="tw-text-[#F23064] tw-bg-[#ffffff] tw-rounded-lg" />
                </div>
            )}
            <div
                style={{
                    zIndex: 0,
                    padding: selected ? 0 : 0,
                    position: "relative",
                    left: selected ? 0 : 0,
                    top: 0,
                    transition: "all 0.2s linear",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <img
                    className={`tw-transition-all tw-duration-300 tw-ease-in-out  ${
                        checkFont
                            ? "tw-w-[80px] tw-h-[80px]"
                            : selected
                            ? "tw-w-[60.73px]  tw-h-[60.73px] "
                            : " tw-h-[60.73px] tw-w-[62.73px] "
                    }`}
                    src={thumbnail}
                    style={{
                        borderRadius: "10px",
                        // width: "100%",
                        // height: "100%",
                    }}
                />
            </div>
        </div>
    );
};
