function FormSection({ title, subTitle, children }) {
    return (
        <div className="pt-[10px] pb-[36px] border-b-[1px] border-slate-300">
            {title && <h1 className="inline-block font-bold mb-3 border-b-2 border-primary">{title}</h1>}

            {subTitle && <p className="text-gray-500 mb-[20px] text-justify">{subTitle}</p>}

            {children}
        </div>
    );
}

export default FormSection;
