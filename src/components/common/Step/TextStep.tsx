import React, { Ref, useCallback, useEffect, useRef, useState } from "react";
import { AnyStepData, ColorOption, StepHandle, StepType, TextStepHandle, Variant } from "@spiffcommerce/core";
import { ColorGallery } from "../ColorGallery";
import { GridVariantSelector, HorizontalVariantSelector } from "../VariantSelector";

const DesktopTextStep: React.FunctionComponent<{
    colors: ColorOption[];
    currentVariant?: Variant;
    fill: string;
    inputText: string;
    onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
    onType: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onVariantChanged: (v: Variant) => void;
    remainingCharacters?: number;
    selectColor: (selection: ColorOption) => void;
    textRef: Ref<HTMLTextAreaElement>;
    variants: Variant[];
}> = (props) => {
    const {
        colors,
        currentVariant,
        fill,
        inputText,
        onPaste,
        onType,
        onVariantChanged,
        remainingCharacters,
        selectColor,
        textRef,
        variants,
    } = props;

    return (
        <div className="tw-pointer-events-auto tw-w-[225px]">
            <div>
                <h1 className="tw-mb-2 tw-text-white tw-text-[15px] tw-leading-[18px]">Add Text</h1>
                <textarea
                    ref={textRef}
                    className="tw-h-[89px] tw-bg-[#FFFFFF] tw-border tw-rounded tw-px-4 focus:tw-outline-none"
                    style={{
                        borderRadius: "6px",
                        height: "60px",
                        marginBottom: 0,
                        padding: "9px 1rem",
                        resize: "none",
                        width: "100%",
                    }}
                    id="grid-first-name"
                    onChange={onType}
                    onPaste={onPaste}
                    value={inputText}
                />
                {remainingCharacters !== undefined && (
                    <h4 className="tw-mb-2 tw-text-white tw-text-[10px]">{remainingCharacters} characters remaining</h4>
                )}
            </div>
            <h1 className="tw-mb-2 tw-text-white tw-text-[15px] tw-leading-[18px]">Font</h1>
            <GridVariantSelector
                onVariantChanged={onVariantChanged}
                selectedVariantId={currentVariant?.getId()}
                variants={variants}
            />
            <div className="tw-mt-2">
                <h1 className="tw-mb-2 tw-text-white tw-text-[15px] tw-leading-[18px]">Color</h1>
                <ColorGallery columnCount={5} onColorSelected={selectColor} colors={colors} selectedFill={fill} />
            </div>
        </div>
    );
};

const MobileTextStep: React.FC<{
    colors: ColorOption[];
    currentVariant?: Variant;
    fill: string;
    inputText: string;
    onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
    onType: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onVariantChanged: (v: Variant) => void;
    remainingCharacters?: number;
    selectColor: (selection: ColorOption) => void;
    textRef: Ref<HTMLTextAreaElement>;
    variants: Variant[];
}> = (props) => {
    const {
        colors,
        currentVariant,
        fill,
        inputText,
        onPaste,
        onType,
        onVariantChanged,
        remainingCharacters,
        selectColor,
        textRef,
        variants,
    } = props;

    return (
        <div className="tw-pointer-events-auto" style={{ width: "100%" }}>
            <div className="tw-mt-4">
                <h1 className="tw-text-white tw-text-[15px] tw-leading-[18px]" style={{ margin: "10px 0" }}>
                    Add Text
                </h1>
                <textarea
                    ref={textRef}
                    className="tw-h-[89px] tw-bg-[#FFFFFF] tw-border tw-rounded tw-py-3 tw-px-4 tw-mb-3 focus:tw-outline-none"
                    style={{
                        borderRadius: "6px",
                        height: "43px",
                        marginBottom: 0,
                        padding: "9px 1rem",
                        resize: "none",
                        width: "100%",
                        overflowY: "hidden",
                    }}
                    id="grid-first-name"
                    onChange={onType}
                    onPaste={onPaste}
                    value={inputText}
                />
                {remainingCharacters !== undefined && (
                    <h4 className="tw-text-white tw-text-[10px]" style={{ textAlign: "right" }}>
                        {remainingCharacters} characters remaining
                    </h4>
                )}
            </div>
            <h1 className="tw-text-white tw-text-[15px] tw-leading-[18px]" style={{ margin: "10px 0" }}>
                Font
            </h1>
            <HorizontalVariantSelector
                onVariantChanged={onVariantChanged}
                selectedVariantId={currentVariant?.getId()}
                variants={variants}
            />
            <div className="tw-mt-4">
                <h1 className="tw-text-white tw-text-[15px] tw-leading-[18px]" style={{ margin: "10px 0" }}>
                    Color
                </h1>
                <ColorGallery columnCount={8} onColorSelected={selectColor} colors={colors} selectedFill={fill} />
            </div>
        </div>
    );
};

export const TextStep: React.FC<{
    step: StepHandle<AnyStepData>;
}> = (props) => {
    const { step } = props;

    const [variants, setVariants] = useState<Variant[]>([]);
    const [currentVariant, setCurrentVariant] = useState<Variant | undefined>(undefined);

    useEffect(() => {
        setVariants(step.getAvailableVariants());
        setCurrentVariant(step.getCurrentVariant());
    }, [step]);

    const onVariantChanged = useCallback(
        (variant: Variant) => {
            step.selectVariant(variant);
        },
        [step],
    );

    // Text.
    const textRef = useRef<HTMLTextAreaElement>();
    const [inputText, setInputText] = useState(""); // Default text set by useEffect.
    const [remainingCharacters, setRemainingCharacters] = useState<undefined | number>(undefined);
    const onType = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Don't allow typing past character limit.
        if (e.target.value.length > (step as TextStepHandle).getCharacterLimit()) {
            return;
        }
        setInputText(e.target.value);
    };
    const onPaste = useCallback(
        (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
            e.preventDefault();
            const clipText = e.clipboardData.getData("text");
            if (!clipText) {
                return;
            }

            const textArea = textRef.current;
            const startIdx = textArea.selectionStart;
            const endIdx = textArea.selectionEnd;

            // Don't allow pasting past character limit.
            if (
                inputText.length - (endIdx - startIdx) + clipText.length >
                (step as TextStepHandle).getCharacterLimit()
            ) {
                return;
            }

            const start = inputText.slice(0, startIdx);
            const end = inputText.slice(endIdx);
            const newInputText = start + clipText + end;
            setInputText(newInputText);
        },
        [inputText, step],
    );
    useEffect(() => {
        if (step.getType() === StepType.Text) {
            setInputText((step as TextStepHandle).getText()); // Set default text.
            setRemainingCharacters((step as TextStepHandle).getCharactersRemaining());
        }
    }, [step]);
    useEffect(() => {
        if (step.getType() === StepType.Text) {
            (step as TextStepHandle).setText(inputText);
            setRemainingCharacters((step as TextStepHandle).getCharactersRemaining());
        }
    }, [step, inputText]);

    // Color.
    const [colors, setColors] = useState<ColorOption[]>([]);
    const [fill, setFill] = useState("");
    useEffect(() => {
        if (step.getType() === StepType.Text) {
            const stepColors = (step as TextStepHandle).getAvailableColors();
            setColors(stepColors);
            setFill((step as TextStepHandle).getFill());
        }
    }, [step]);
    const selectColor = useCallback(
        (selection: ColorOption) => {
            (step as TextStepHandle).setFill(selection);
            setFill(selection.fill || "");
        },
        [step],
    );

    return (
        <div>
            <div className="tw-hidden lg:tw-block">
                <DesktopTextStep
                    colors={colors}
                    currentVariant={currentVariant}
                    fill={fill}
                    inputText={inputText}
                    onPaste={onPaste}
                    onType={onType}
                    onVariantChanged={onVariantChanged}
                    remainingCharacters={remainingCharacters}
                    selectColor={selectColor}
                    textRef={textRef}
                    variants={variants}
                />
            </div>
            <div
                className="lg:tw-hidden"
                style={{ paddingRight: "32px", width: "100%", position: "fixed", bottom: 130 }}
            >
                <MobileTextStep
                    colors={colors}
                    currentVariant={currentVariant}
                    fill={fill}
                    inputText={inputText}
                    onPaste={onPaste}
                    onType={onType}
                    onVariantChanged={onVariantChanged}
                    remainingCharacters={remainingCharacters}
                    selectColor={selectColor}
                    textRef={textRef}
                    variants={variants}
                />
            </div>
        </div>
    );
};
