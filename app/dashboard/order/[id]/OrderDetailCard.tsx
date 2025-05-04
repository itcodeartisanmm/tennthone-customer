import { CardBody } from "@heroui/react";
import { Card } from "@heroui/react";

export const OrderDetailCard = ({ title, subtitle = null, children }: { title: string, subtitle: string | null, children: React.ReactNode }) => {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-2 mb-5">
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && (
            <span className="text-sm leading-5 font-medium text-gray-500">
              {subtitle}
            </span>
          )}
        </div>
        {children}
      </CardBody>
    </Card>
  );
};
