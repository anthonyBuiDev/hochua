import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonType = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: BackButtonType) => {
  return (
    <Button className="w-full font-medium" asChild variant={"link"}>
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
};
