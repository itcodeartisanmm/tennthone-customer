export const OrderDetailCardBody = ({ label, description = null, value }: { label: string, description: string | null, value: string }) => {
    return (
        <div className="flex flex-row justify-between">
            <span className="text-sm leading-5 font-medium my-3">{label}</span>
            {description && (
                <span className="text-sm leading-5 font-medium my-3 text-gray-500 text-end">
                    {description}
                </span>
            )}
            <span className="text-sm leading-5 font-medium my-3">{value}</span>
        </div>
    );
};