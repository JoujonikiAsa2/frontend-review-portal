"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Star, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createReview, updateReview } from "@/Services/Reviews";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

// Define form schema with Zod
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z
    .string()
    .min(10, { message: "Review should be at least 10 characters" }),
  RatingSummary: z.string().min(1, { message: "Please provide a rating" }),
  markAsPremium: z.boolean().default(false),
});

export default function ReviewForm() {
  const path = usePathname();
  const formType = path.split("/")[3].split("-")[0];
  const reviewId = path.split("/")[4];
  const router = useRouter();
  // State for image file and preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const categories = {
    MOVIE: "Movie",
    TV_SHOW: "TV Show",
    BOOK: "Book",
    ELECTRONICS: "Electronics",
    VEHICLE: "Vehicle",
  };

  // Initialize form with react-hook-form and shadcn
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      RatingSummary: "",
      markAsPremium: false,
    },
  });

  // Create object URL for preview when image changes
  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreview(objectUrl);

      // Clean up function to revoke object URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const loadingId = toast.loading("Submitting...");
    // Handle form submission
    console.log("Form submitted:", values);
    const payload = {
      title: values.title,
      category: values.category,
      description: values.description,
      RatingSummary: Number(values.RatingSummary),
    };
    // Create FormData object for API submission
    const transformedFormData = new FormData();
    if (imageFile) {
      transformedFormData.append("file", imageFile);
    }
    transformedFormData.append("data", JSON.stringify(payload));
    let result;
    if (formType === "create") {
      result = await createReview(transformedFormData);
    } else {
      result = await updateReview(transformedFormData, reviewId);
    }
    if (result.success) {
      toast.success(result.message, {
        id: loadingId,
      });
      setTimeout(() => {
        router.push(
          `/dashboard/${session?.user.role.toLowerCase()}/my-reviews`
        );
      }, 1000);
    } else {
      toast.error(result.message, {
        id: loadingId,
      });
    }
    // Reset form after submission
    form.reset();
    setImageFile(null);
    setImagePreview(null);
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Header Section with Image Upload */}
      <div
        className="w-full relative bg-gray-800 text-white py-16 px-4 text-center"
        style={{
          backgroundImage: imagePreview
            ? `url('${imagePreview}')`
            : "url('/api/placeholder/1200/400')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="z-10 relative">
          <h1 className="text-4xl font-bold mb-4">
            {formType === "create" ? "Submit Your" : "Modify"} Review
          </h1>
          <p className="text-sm mb-8">
            Share your thoughts and help others make informed decisions about
            their purchases.
          </p>

          <div className="max-w-md mx-auto relative">
            {imagePreview ? (
              <div className="mb-4 relative">
                <div className="border-2 border-white border-dashed rounded-lg p-2">
                  <p className="text-sm text-white">Image uploaded</p>
                </div>
              </div>
            ) : (
              <Label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-700 bg-opacity-50 hover:bg-gray-600 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-200" />
                  <p className="mb-2 text-sm text-gray-200">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-300">
                    PNG, JPG or GIF (MAX. 2MB)
                  </p>
                </div>
                <Input
                  id="image-upload"
                  name="imageUrl"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </Label>
            )}
          </div>
        </div>
        {imagePreview && (
          <Button
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white text-gray-800 hover:bg-gray-100"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Form Section */}
      <Card className="w-full max-w-2xl mx-auto my-8 shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            {formType === "create" ? "Submit" : "Modify"} Review
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          formType === "create"
                            ? "Give your review a title"
                            : "Update your review title"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(categories).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="RatingSummary"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-8 h-8 cursor-pointer ${
                              star <= Number(field.value)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                            onClick={() => field.onChange(star.toString())}
                            onMouseEnter={(e) => {
                              e.currentTarget.classList.add(
                                "hover:text-yellow-300"
                              );
                            }}
                          />
                        ))}
                        {Number(field.value) > 0 && (
                          <span className="ml-2 text-sm text-gray-500">
                            {field.value} out of 5
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your review..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="markAsPremium"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Mark as Premium</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto">
                Publish
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
