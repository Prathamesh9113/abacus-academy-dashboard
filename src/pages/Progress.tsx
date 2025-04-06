
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { Progress } from "@/components/ui/progress";
import { demoUser } from "@/utils/data";
import { Award, Brain, Calculator } from "lucide-react";

const ProgressPage = () => {
  const { progressData, averageScore, completedExams } = demoUser;

  // Calculate additional metrics
  const latestScore = progressData[progressData.length - 1].score;
  const firstScore = progressData[0].score;
  const improvement = latestScore - firstScore;
  const improvementPercentage = Math.round((improvement / firstScore) * 100);

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Progress Tracker</h1>
        <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
          Monitor your improvement and gain insights into your abacus learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <Progress value={averageScore} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {averageScore >= 80 ? "Excellent!" : 
               averageScore >= 70 ? "Good progress!" : 
               averageScore >= 60 ? "Keep improving!" : 
               "More practice needed"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedExams}</div>
            <Progress value={(completedExams / 20) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {20 - completedExams} more exams until advanced certification
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{improvementPercentage}%</div>
            <Progress value={improvement} max={40} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              From {firstScore}% to {latestScore}% over {progressData.length} exams
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Score Progress</CardTitle>
            <CardDescription>Your exam scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    activeDot={{ r: 8 }}
                    name="Exam Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
            <CardDescription>Breakdown of your abacus skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Addition', score: 92 },
                  { name: 'Subtraction', score: 85 },
                  { name: 'Multiplication', score: 79 },
                  { name: 'Division', score: 68 },
                  { name: 'Mental Calc', score: 74 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="hsl(var(--primary))" name="Skill Level" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden border-2">
          <div className="p-1 bg-primary/10 flex justify-center">
            <Calculator className="h-12 w-12 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle>Speed Challenge</CardTitle>
            <CardDescription>Test your calculation speed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Current best time: <span className="font-semibold">45 seconds</span></p>
              <p>Weekly rank: <span className="font-semibold">12th</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-2">
          <div className="p-1 bg-primary/10 flex justify-center">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle>Mental Math</CardTitle>
            <CardDescription>Visualize without abacus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Accuracy rate: <span className="font-semibold">82%</span></p>
              <p>Practice streak: <span className="font-semibold">7 days</span></p>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-2">
          <div className="p-1 bg-primary/10 flex justify-center">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your earned badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Unlocked: <span className="font-semibold">7/15</span></p>
              <p>Next badge: <span className="font-semibold">Speed Demon</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressPage;
