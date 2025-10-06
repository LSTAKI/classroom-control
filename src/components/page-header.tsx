import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold font-headline text-foreground">{title}</h1>
      {description && <p className="mt-2 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
};

export default PageHeader;
