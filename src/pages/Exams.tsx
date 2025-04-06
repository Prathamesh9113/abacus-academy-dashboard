
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";
import { exams } from "@/utils/data";

const Exams = () => {
  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Abacus Exams</h1>
        <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
          Test your skills and earn certifications with our structured examinations. Each exam is designed to assess your proficiency at different levels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="overflow-hidden border-2 transition-all duration-200 hover:shadow-md">
            <div className="aspect-video relative">
              <img 
                src={exam.image} 
                alt={exam.title} 
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-2 right-2" variant={
                exam.level === "Beginner" ? "default" :
                exam.level === "Intermediate" ? "secondary" :
                exam.level === "Advanced" ? "destructive" : "outline"
              }>
                {exam.level}
              </Badge>
            </div>
            <CardHeader className="p-4">
              <CardTitle>{exam.title}</CardTitle>
              <CardDescription>{exam.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{exam.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{exam.questions} questions</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Start Exam</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-muted rounded-lg p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Exam Guidelines</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Complete all questions within the allocated time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Ensure you have a quiet environment without distractions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>You can use a physical abacus for calculation unless specified otherwise.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Certificates will be issued for scores above 70%.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>You can retake an exam after 7 days if you don't achieve the required score.</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Certification Pathways</h2>
            <div className="space-y-2">
              <div className="p-3 rounded-md bg-background">
                <h3 className="font-semibold">Beginner Certificate</h3>
                <p className="text-sm text-muted-foreground">First step in your abacus journey, covering basic operations.</p>
              </div>
              <div className="p-3 rounded-md bg-background">
                <h3 className="font-semibold">Intermediate Certificate</h3>
                <p className="text-sm text-muted-foreground">Advanced operations with moderate complexity and speed requirements.</p>
              </div>
              <div className="p-3 rounded-md bg-background">
                <h3 className="font-semibold">Advanced Certificate</h3>
                <p className="text-sm text-muted-foreground">Complex calculations with high accuracy and speed targets.</p>
              </div>
              <div className="p-3 rounded-md bg-background">
                <h3 className="font-semibold">Master Certificate</h3>
                <p className="text-sm text-muted-foreground">The highest recognition of mental math proficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
