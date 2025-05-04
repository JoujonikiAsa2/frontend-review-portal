"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Star } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePathname } from 'next/navigation';
import { IconRating18Plus } from '@tabler/icons-react';

export default function ReviewForm() {
    const path = usePathname();
    const formType = path.split("/")[3].split("-")[0];
    console.log("path name",);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        RatingSummary: '',
        markAsPremium: false,
        imageUrl: null
    });
    const categories = {
        MOVIE: "Movie",
        TV_SHOW: "TV Show",
        BOOK: "Book",
        ELECTRONICS: "Electronics",
        VEHICLE: "Vehicle"
    };
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file' && files.length > 0) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        const { imageUrl, ...rest } = formData;
        const payload = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            RatingSummary: formData.RatingSummary,
        }
        const transformedFormData = new FormData();
        if (imageUrl || payload) {
            transformedFormData.append("file", imageUrl!);
            transformedFormData.append("data", JSON.stringify(payload));
        }
        console.log("form ",transformedFormData)
        

        // Reset form after submission
        setFormData({
            title: '',
            category: '',
            description: '',
            RatingSummary: "",
            markAsPremium: false,
            imageUrl: null
        });
    };
    const handleCategoryChange = (value) => {
        setFormData(prev => ({
            ...prev,
            category: value
        }));
    };

    const handleRatingChange = (RatingSummary) => {
        setFormData(prev => ({
            ...prev,
            RatingSummary
        }));
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Header Section with Image Upload */}
            <div
                className="w-full relative bg-gray-800 text-white py-16 px-4 text-center"
                style={{
                    backgroundImage: "url('/api/placeholder/1200/400')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay"
                }}
            >
                <div className="z-10 relative">
                    <h1 className="text-4xl font-bold mb-4"> {formType === "create" ? "Submit Your" : "Modify"}  Review</h1>
                    <p className="text-sm mb-8">Share your thoughts and help others make informed decisions about their purchases.</p>

                    <div className="max-w-md mx-auto">
                        <Label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-700 bg-opacity-50 hover:bg-gray-600 transition-all"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-gray-200" />
                                <p className="mb-2 text-sm text-gray-200">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
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
                                onChange={handleChange}
                            />
                        </Label>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <Card className="w-full max-w-2xl mx-auto my-8 shadow-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">{formType === "create" ? "Submit" : "Modify"}   Review</CardTitle>

                </CardHeader>

                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder={formType === "create" ? "Give your review a title" : "Update your review a title"}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(categories).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating</Label>
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-8 h-8 cursor-pointer ${star <= Number(formData.RatingSummary)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                        onClick={() => handleRatingChange(star)}
                                        onMouseEnter={(e) => {
                                            // Add hover effect if needed
                                            e.currentTarget.classList.add('hover:text-yellow-300');
                                        }}
                                    />
                                ))}
                                {Number(formData.RatingSummary) > 0 && (
                                    <span className="ml-2 text-sm text-gray-500">
                                        {formData.RatingSummary} out of 5
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="review">Review</Label>
                            <Textarea
                                id="review"
                                name="review"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write your review..."
                                className="min-h-32"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="markAsPremium"
                                name="markAsPremium"
                                checked={formData.markAsPremium}
                                onCheckedChange={(checked) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        agreeToTerms: checked as boolean
                                    }));
                                }}
                            />
                            <Label htmlFor="markAsPremium">Mark as Premium</Label>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full md:w-auto"
                        >
                            Publish
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}