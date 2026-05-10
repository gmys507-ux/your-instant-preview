import { Hero } from '../components/home/Hero'
import { KPIScoreboard } from '../components/home/KPIScoreboard'
import { ModuleCards } from '../components/home/ModuleCards'
import { ActionStrip } from '../components/home/ActionStrip'

export function HomePage() {
  return (
    <>
      <Hero />
      <KPIScoreboard />
      <ModuleCards />
      <ActionStrip />
    </>
  )
}
