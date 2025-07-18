import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link, Github } from "lucide-react";
import Image from "next/image";
import IconRouter from "./IconRouter";

interface ProjectCardProps {
  name: string;
  coverImg: string;
  description: string;
  isOpen?: boolean;
  isLink?: boolean;
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  return (
    <div className="w-full h-full">
      <Card>
        <CardHeader>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
          <CardAction>
            {props.isOpen ? (
              <IconRouter url={props.link}>
                <Github className="text-muted-foreground  hover:text-primary cursor-pointer" />
              </IconRouter>
            ) : null}
            {props.isLink ? (
              <IconRouter url={props.link}>
                <Link className="text-muted-foreground  hover:text-primary cursor-pointer" />
              </IconRouter>
            ) : null}
          </CardAction>
        </CardHeader>
        <CardContent>
          <Image src={props.coverImg} width={500} height={500} alt="项目封面" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectCard;
