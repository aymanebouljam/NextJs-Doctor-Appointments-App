import DoctorsList from "./_components/DoctorsList";
import Hero from "./_components/Hero";
import SearchCategories from "./_components/SearchCategories";

export default function Home() {
  return (
    <div>
      <Hero />
      <SearchCategories />
      <DoctorsList />
    </div>
  );
}
