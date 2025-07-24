import React, { useState } from 'react';
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
import emailjs from 'emailjs-com'; // Import EmailJS

const formSchema = z.object({
  authorType: z.enum(["named", "anonymous"]),
  authorName: z.string().optional()
    .refine((val) => {
      if (val === "" || val === undefined) return true;
      return val.length >= 2;
    }, { message: "O nome deve ter pelo menos 2 caracteres" }),
  authorEmail: z.string().email("Digite um e-mail válido").optional(),
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  story: z.string().min(100, { message: "A história deve ter pelo menos 100 caracteres" }),
});

type FormValues = z.infer<typeof formSchema>;

const Enviar = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorType: "named",
      authorName: "",
      authorEmail: "",
      title: "",
      story: "",
    },
  });

  const watchAuthorType = form.watch("authorType");

  async function onSubmit(data: FormValues) {
    try {
      // Send email using EmailJS
      const templateParams = {
        to_email: "suiane.studio@gmail.com",
        author_type: data.authorType === "anonymous" ? "Anônimo" : "Identificado",
        author_name: data.authorType === "anonymous" ? "Anônimo" : data.authorName,
        author_email: data.authorType === "anonymous" ? "Não fornecido" : data.authorEmail,
        title: data.title,
        story: data.story,
      };

      await emailjs.send(
        'service_5fius0j', // Replace with your EmailJS service ID
        'template_jwo2g6s', // Replace with your EmailJS template ID
        templateParams,
        'dDnpcUyXMa_df3vql' // Replace with your EmailJS public API key
      );

      setIsSubmitted(true); // Show confirmation message
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      toast({
        title: "Erro ao enviar lenda",
        description: "Ocorreu um problema ao enviar sua lenda. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="container mx-auto px-4 flex-grow flex flex-col items-center justify-center text-center">
          <h1 className="font-playfair text-3xl md:text-4xl text-aged-white mb-4">
            Lenda Enviada com Sucesso!
          </h1>
          <p className="font-lora text-muted-foreground max-w-lg">
            Obrigado por compartilhar sua história. Ela será processada e, se aprovada, será publicada no site.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            className="mt-6 bg-blood-red hover:bg-blood-red/90"
          >
            Enviar Outra Lenda
          </Button>
        </div>
        <Footer />
      </div>
    );
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
                    <>
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
                      <FormField
                        control={form.control}
                        name="authorEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seu e-mail</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu e-mail" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
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
