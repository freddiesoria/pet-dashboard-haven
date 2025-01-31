import { Label } from "../ui/label";
import { CategorySelect } from "../CategorySelect";
import { TagSelect } from "../TagSelect";

interface BlogTaxonomyFieldsProps {
  categories: string[];
  tags: string[];
  onCategoriesChange: (categories: string[]) => void;
  onTagsChange: (tags: string[]) => void;
}

export function BlogTaxonomyFields({ 
  categories, 
  tags, 
  onCategoriesChange, 
  onTagsChange 
}: BlogTaxonomyFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Categories</Label>
        <CategorySelect
          value={categories}
          onChange={onCategoriesChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <TagSelect
          value={tags}
          onChange={onTagsChange}
        />
      </div>
    </>
  );
}