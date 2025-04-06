
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { practicePapers } from "@/utils/data";

const Practice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredPapers = practicePapers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || paper.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Practice Papers</h1>
        <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
          Access our library of practice papers to enhance your abacus skills through regular practice and repetition.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search practice papers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPapers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No practice papers match your search criteria.</p>
          <Button variant="link" onClick={() => {setSearchTerm(""); setLevelFilter("all");}}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="overflow-hidden border-2 transition-all duration-200 hover:shadow-md">
              <div className="aspect-video relative">
                <img 
                  src={paper.image} 
                  alt={paper.title} 
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2" variant={
                  paper.level === "Beginner" ? "default" :
                  paper.level === "Intermediate" ? "secondary" :
                  "destructive"
                }>
                  {paper.level}
                </Badge>
              </div>
              <CardHeader className="p-4">
                <CardTitle>{paper.title}</CardTitle>
                <CardDescription>{paper.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  {paper.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Paper
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 p-6 md:p-8 border-2 rounded-lg">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold">Practice Guidelines</h2>
          <p className="text-muted-foreground">
            Regular practice is key to mastering abacus skills. We recommend:
          </p>
          <ul className="text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>15-30 minutes of focused practice daily</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Starting with your current level and gradually progressing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Reviewing mistakes to understand and correct them</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Tracking your speed and accuracy improvements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Attempting an exam only when confident with practice papers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Practice;
