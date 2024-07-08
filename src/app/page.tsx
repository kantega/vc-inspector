import FeedbackBox from '@/components/notices/FeedbackBox';
import { Card } from '@/components/ui/card';
import InspectionPage from '@/components/vc-inspection/InspectionPage';

export default function Home() {
  return (
    <>
      <InspectionPage />
      <FeedbackBox />
      <Card>Tester</Card>
    </>
  );
}
