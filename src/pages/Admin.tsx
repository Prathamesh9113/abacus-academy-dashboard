
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { exams, practicePapers } from "@/utils/data";
import { FileText, Image, Pencil, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const examSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  level: z.string().min(1, {
    message: "Please select a level.",
  }),
  duration: z.string().min(1, {
    message: "Please enter the duration.",
  }),
  questions: z.string().min(1, {
    message: "Please enter the number of questions.",
  }),
  image: z.string().optional(),
});

const practiceSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  level: z.string().min(1, {
    message: "Please select a level.",
  }),
  topics: z.string().min(1, {
    message: "Please enter at least one topic.",
  }),
  image: z.string().optional(),
});

const Admin = () => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);
  
  const examForm = useForm<z.infer<typeof examSchema>>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: "",
      description: "",
      level: "",
      duration: "",
      questions: "",
      image: "",
    },
  });

  const practiceForm = useForm<z.infer<typeof practiceSchema>>({
    resolver: zodResolver(practiceSchema),
    defaultValues: {
      title: "",
      description: "",
      level: "",
      topics: "",
      image: "",
    },
  });

  function onSubmitExam(values: z.infer<typeof examSchema>) {
    console.log(values);
    toast({
      title: selectedExam ? "Exam Updated" : "Exam Created",
      description: `The exam "${values.title}" has been ${selectedExam ? "updated" : "created"} successfully.`,
    });
    examForm.reset();
    setSelectedExam(null);
  }

  function onSubmitPractice(values: z.infer<typeof practiceSchema>) {
    console.log(values);
    toast({
      title: selectedPractice ? "Practice Paper Updated" : "Practice Paper Created",
      description: `The practice paper "${values.title}" has been ${selectedPractice ? "updated" : "created"} successfully.`,
    });
    practiceForm.reset();
    setSelectedPractice(null);
  }

  function editExam(id: string) {
    const exam = exams.find(e => e.id === id);
    if (exam) {
      examForm.setValue("title", exam.title);
      examForm.setValue("description", exam.description);
      examForm.setValue("level", exam.level === "Beginner" ? "beginner" : 
                               exam.level === "Intermediate" ? "intermediate" : 
                               exam.level === "Advanced" ? "advanced" : "master");
      examForm.setValue("duration", exam.duration.toString());
      examForm.setValue("questions", exam.questions.toString());
      examForm.setValue("image", exam.image);
      setSelectedExam(id);
    }
  }

  function editPractice(id: string) {
    const practice = practicePapers.find(p => p.id === id);
    if (practice) {
      practiceForm.setValue("title", practice.title);
      practiceForm.setValue("description", practice.description);
      practiceForm.setValue("level", practice.level === "Beginner" ? "beginner" : 
                                  practice.level === "Intermediate" ? "intermediate" : "advanced");
      practiceForm.setValue("topics", practice.topics.join(", "));
      practiceForm.setValue("image", practice.image);
      setSelectedPractice(id);
    }
  }

  function cancelEditExam() {
    examForm.reset();
    setSelectedExam(null);
  }

  function cancelEditPractice() {
    practiceForm.reset();
    setSelectedPractice(null);
  }

  function deleteExam(id: string) {
    console.log(`Delete exam ${id}`);
    toast({
      title: "Exam Deleted",
      description: "The exam has been deleted successfully.",
      variant: "destructive",
    });
  }

  function deletePractice(id: string) {
    console.log(`Delete practice ${id}`);
    toast({
      title: "Practice Paper Deleted",
      description: "The practice paper has been deleted successfully.",
      variant: "destructive",
    });
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="exams" className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="practice">Practice Papers</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        {/* Exams Tab */}
        <TabsContent value="exams" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Exam Management</h2>
            {!selectedExam && (
              <Button onClick={() => examForm.reset()}>
                <Plus className="mr-2 h-4 w-4" /> Add New Exam
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`md:col-span-1 ${selectedExam ? 'border-primary' : ''}`}>
              <CardHeader>
                <CardTitle>{selectedExam ? "Edit Exam" : "Create New Exam"}</CardTitle>
                <CardDescription>
                  {selectedExam ? "Update the selected exam details." : "Add a new exam to the platform."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...examForm}>
                  <form onSubmit={examForm.handleSubmit(onSubmitExam)} className="space-y-4">
                    <FormField
                      control={examForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Exam title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={examForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Exam description"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={examForm.control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                                <SelectItem value="master">Master</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={examForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (minutes)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={examForm.control}
                        name="questions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Questions</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={examForm.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="Image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="pt-2 flex gap-2">
                      <Button type="submit" className="flex-1">
                        {selectedExam ? "Update Exam" : "Create Exam"}
                      </Button>
                      {selectedExam && (
                        <Button variant="outline" type="button" onClick={cancelEditExam}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-4">
              <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted rounded-t-md">
                  <div className="col-span-6">Title</div>
                  <div className="col-span-2">Level</div>
                  <div className="col-span-2">Duration</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {exams.map((exam) => (
                    <div key={exam.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-6 font-medium">{exam.title}</div>
                      <div className="col-span-2">
                        <Badge variant={
                          exam.level === "Beginner" ? "default" :
                          exam.level === "Intermediate" ? "secondary" :
                          exam.level === "Advanced" ? "destructive" : "outline"
                        }>
                          {exam.level}
                        </Badge>
                      </div>
                      <div className="col-span-2">{exam.duration} min</div>
                      <div className="col-span-2 flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => editExam(exam.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete "{exam.title}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button variant="destructive" onClick={() => deleteExam(exam.id)}>Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Practice Papers Tab */}
        <TabsContent value="practice" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Practice Paper Management</h2>
            {!selectedPractice && (
              <Button onClick={() => practiceForm.reset()}>
                <Plus className="mr-2 h-4 w-4" /> Add New Practice Paper
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`md:col-span-1 ${selectedPractice ? 'border-primary' : ''}`}>
              <CardHeader>
                <CardTitle>{selectedPractice ? "Edit Practice Paper" : "Create New Practice Paper"}</CardTitle>
                <CardDescription>
                  {selectedPractice ? "Update the selected practice paper details." : "Add a new practice paper to the platform."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...practiceForm}>
                  <form onSubmit={practiceForm.handleSubmit(onSubmitPractice)} className="space-y-4">
                    <FormField
                      control={practiceForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Practice paper title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={practiceForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Practice paper description"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={practiceForm.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={practiceForm.control}
                      name="topics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topics (comma separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="Addition, Subtraction, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={practiceForm.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-2 flex gap-2">
                      <Button type="submit" className="flex-1">
                        {selectedPractice ? "Update Practice Paper" : "Create Practice Paper"}
                      </Button>
                      {selectedPractice && (
                        <Button variant="outline" type="button" onClick={cancelEditPractice}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-4">
              <div className="border rounded-md">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm bg-muted rounded-t-md">
                  <div className="col-span-6">Title</div>
                  <div className="col-span-2">Level</div>
                  <div className="col-span-2">Topics</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {practicePapers.map((paper) => (
                    <div key={paper.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-6 font-medium">{paper.title}</div>
                      <div className="col-span-2">
                        <Badge variant={
                          paper.level === "Beginner" ? "default" :
                          paper.level === "Intermediate" ? "secondary" : "destructive"
                        }>
                          {paper.level}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <span className="text-xs">{paper.topics.length} topics</span>
                      </div>
                      <div className="col-span-2 flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => editPractice(paper.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete "{paper.title}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button variant="destructive" onClick={() => deletePractice(paper.id)}>Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage student accounts, view progress, and assign roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid place-items-center p-8">
                <div className="text-center space-y-4">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-medium">User Management</h3>
                  <p className="text-muted-foreground">
                    This feature will be implemented in the next version.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
