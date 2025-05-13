
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Send, User } from 'lucide-react';

const formSchema = z.object({
  authorType: z.enum(["named", "anonymous"]),
  authorName: z.string().optional()
    .refine((val) => {
      if (val === "" || val === undefined) return true;
      return val.length >= 2;
    }, { message: "O nome deve ter pelo menos 2 caracteres" }),
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  story: z.string().min(100, { message: "A história deve ter pelo menos 100 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

const Enviar = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorType: "named",
      authorName: "",
      title: "",
      story: "",
    },
  });

  const watchAuthorType = form.watch("authorType");

  function onSubmit(data: FormValues) {
    // Em um cenário real, enviaríamos para uma API
    console.log("Formulário enviado:", data);
    
    // Apenas para demonstração, salvamos no localStorage
    const legends = JSON.parse(localStorage.getItem("legends") || "[]");
    const newLegend = {
      id: Date.now(),
      authorType: data.authorType,
      authorName: data.authorType === "anonymous" ? "Anônimo" : data.authorName,
      title: data.title,
      story: data.story,
      createdAt: new Date().toISOString(),
    };
    
    legends.push(newLegend);
    localStorage.setItem("legends", JSON.stringify(legends));
    
    toast({
      title: "Lenda enviada com sucesso!",
      description: "Obrigado por compartilhar sua história.",
    });
    
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <Header />
        <main className="flex-grow py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="font-playfair text-3xl md:text-4xl text-aged-white mb-4">
                Envie Sua Lenda
              </h1>
              <p className="font-lora text-muted-foreground">
                Compartilhe conosco as histórias místicas e lendas que você conhece
              </p>
              <div className="mt-4 h-px w-24 bg-blood-red/50 mx-auto"></div>
            </div>
            
            <div className="bg-card border border-muted p-6 rounded-lg shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="authorType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Como deseja ser identificado?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="named" id="named" />
                              <label htmlFor="named" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Com meu nome
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="anonymous" id="anonymous" />
                              <label htmlFor="anonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Anônimo
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {watchAuthorType === "named" && (
                    <FormField
                      control={form.control}
                      name="authorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seu nome</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="Digite seu nome" {...field} />
                              <User className="absolute right-3 top-[50%] transform -translate-y-[50%] text-muted-foreground h-4 w-4" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título da Lenda</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: A Mulher de Branco" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>História</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Conte sua história com detalhes..." 
                            className="min-h-[200px] resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blood-red hover:bg-blood-red/90"
                  >
                    Enviar Lenda
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Enviar;
