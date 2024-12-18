import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackButton } from "./back-button";


type CardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonHref: string;
  backButtonLabel: string;

};

export const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,

}: CardWrapperProps) => {
  return (
    <div className="mx-auto max-w-2xl my-28  flex-grow px-6 md:px-12">
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>

        <CardFooter>
          <BackButton href={backButtonHref} label={backButtonLabel} />
        </CardFooter>
      </Card>
    </div>
  );
};
