import { getPublishedProjects, getPromotions } from "./actions/project";
import FilterData from "./components/FilterData";

export default async function Home() {
  const projects = await getPublishedProjects();
  const promos = await getPromotions();
  
  return (
    <div>
      <FilterData 
        projects={projects}
        promos={promos}
      />
    </div>
  );
}