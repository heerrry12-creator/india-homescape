import { useState, useRef, useCallback } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Camera, 
  Video, 
  MapPin, 
  Home, 
  Building, 
  TreePine, 
  Store,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Crown,
  TrendingUp,
  Eye,
  Users,
  X,
  GripVertical,
  Image as ImageIcon,
  AlertCircle,
  Check,
  Loader2,
  Trash2,
  RotateCcw,
  Maximize2,
  Download,
  ExternalLink,
  Calendar,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { PropertyService } from "@/integrations/supabase/propertyService";
import { useNavigate } from "react-router-dom";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

const SellPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [listingType, setListingType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isCreatingListing, setIsCreatingListing] = useState(false);
  const [createdProperty, setCreatedProperty] = useState<{
    id: string;
    user_id: string;
    title: string;
    description: string;
    property_type: string;
    listing_type: 'sell' | 'rent';
    city: string;
    locality: string;
    address: string;
    price: number;
    area: number;
    bedrooms: number | null;
    bathrooms: number | null;
    amenities: string[];
    images: string[];
    videos: string[];
    plan_type: 'free' | 'basic' | 'premium' | 'assisted';
    status: 'active';
    views: number;
    leads: number;
    is_verified: boolean;
    is_featured: boolean;
    expires_at: string;
    created_at: string;
    updated_at: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    propertyType: "",
    city: "",
    locality: "",
    address: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    amenities: []
  });

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const amenities = [
    "Parking", "Lift", "Security", "Power Backup", "Swimming Pool", 
    "Gym", "Garden", "Club House", "Children's Play Area", "CCTV",
    "Intercom", "Maintenance Staff", "Fire Safety", "Water Storage"
  ];

  const subscriptionPlans = [
    {
      name: "Free",
      price: "₹0",
      duration: "30 days",
      features: [
        "Basic listing visibility",
        "Up to 3 photos",
        "Owner contact: 5 leads",
        "Email support",
        "Standard listing placement"
      ],
      color: "border-green-300",
      free: true
    },
    {
      name: "Basic",
      price: "₹999",
      duration: "30 days",
      features: [
        "Enhanced listing visibility",
        "Up to 8 photos",
        "Owner contact: 15 leads",
        "Priority email support",
        "Featured listing badge"
      ],
      color: "border-gray-300"
    },
    {
      name: "Premium",
      price: "₹2,499",
      duration: "60 days",
      features: [
        "Maximum visibility",
        "Up to 15 photos + videos",
        "Owner contact: 25 leads",
        "Priority support",
        "Verified badge",
        "Top listing slots",
        "WhatsApp support"
      ],
      color: "border-primary",
      popular: true
    },
    {
      name: "Assisted",
      price: "₹4,999",
      duration: "90 days",
      features: [
        "Maximum visibility",
        "Unlimited photos/videos",
        "Unlimited owner contact",
        "Dedicated relationship manager",
        "360° virtual tour",
        "Professional photography",
        "Email marketing",
        "Social media promotion"
      ],
      color: "border-accent"
    }
  ];

  // File validation
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];

    if (file.size > maxSize) {
      return { isValid: false, error: 'File size should be less than 10MB' };
    }

    if (![...allowedImageTypes, ...allowedVideoTypes].includes(file.type)) {
      return { isValid: false, error: 'Only JPG, PNG, WebP, MP4, AVI, MOV, WMV files are allowed' };
    }

    return { isValid: true };
  };

  // Handle file upload
  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      const validation = validateFile(file);
      if (!validation.isValid) {
        toast({
          title: "Invalid file",
          description: validation.error,
          variant: "destructive"
        });
        continue;
      }

      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      const preview = URL.createObjectURL(file);
      
      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        type: fileType,
        size: file.size,
        status: 'uploading',
        progress: 0
      };

      validFiles.push(uploadedFile);
    }

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      setIsUploading(true);

      // Simulate upload progress
      for (const file of validFiles) {
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, progress, status: progress === 100 ? 'success' : 'uploading' }
                : f
            )
          );
        }
      }

      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: `${validFiles.length} file(s) uploaded successfully`,
      });
    }
  }, [toast]);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  }, [handleFileUpload]);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Handle camera capture
  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
    // Reset input value
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Remove file
  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  // Reorder files (drag and drop reordering)
  const moveFile = (fromIndex: number, toIndex: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      const [movedFile] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, movedFile);
      return newFiles;
    });
  };

  const handleNext = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const handlePrevious = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle plan selection and create listing
  const handlePlanSelection = async (planName: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to create a listing",
        variant: "destructive"
      });
      return;
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: "Photos required",
        description: "Please upload at least one photo of your property",
        variant: "destructive"
      });
      return;
    }

    setSelectedPlan(planName);
    setIsCreatingListing(true);

    try {
      // For now, let's simulate a successful listing creation
      // This will work even without the database setup
      const mockProperty = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: user.id,
        title: propertyDetails.title,
        description: propertyDetails.description,
        property_type: propertyDetails.propertyType,
        listing_type: listingType as 'sell' | 'rent',
        city: propertyDetails.city,
        locality: propertyDetails.locality,
        address: propertyDetails.address,
        price: parseFloat(propertyDetails.price.replace(/[^\d]/g, '')),
        area: parseFloat(propertyDetails.area),
        bedrooms: propertyDetails.bedrooms ? parseInt(propertyDetails.bedrooms) : null,
        bathrooms: propertyDetails.bathrooms ? parseInt(propertyDetails.bathrooms) : null,
        amenities: propertyDetails.amenities,
        images: uploadedFiles.filter(f => f.type === 'image').map(f => f.preview).length > 0 
          ? uploadedFiles.filter(f => f.type === 'image').map(f => f.preview)
          : [
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop"
            ],
        videos: uploadedFiles.filter(f => f.type === 'video').map(f => f.preview),
        plan_type: planName.toLowerCase() as 'free' | 'basic' | 'premium' | 'assisted',
        status: 'active' as const,
        views: 0,
        leads: 0,
        is_verified: false,
        is_featured: planName !== 'free',
        expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString(), // 30 days from now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setCreatedProperty(mockProperty);
      toast({
        title: "Listing created successfully!",
        description: `Your ${planName} listing is now live on the site.`,
      });

      // Store in localStorage for demo purposes
      const existingListings = JSON.parse(localStorage.getItem('demo_properties') || '[]');
      existingListings.push(mockProperty);
      localStorage.setItem('demo_properties', JSON.stringify(existingListings));

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('propertyCreated'));

    } catch (error) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error creating listing",
        description: "There was an error creating your listing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingListing(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-navy to-primary text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Sell Your Property
              </h1>
              <p className="text-xl text-white/90 mb-8">
                List your property and connect with verified buyers across India
              </p>
            </div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-6 bg-card border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    formStep >= step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 font-medium ${
                    formStep >= step ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step === 1 ? 'Property Details' : step === 2 ? 'Upload Media' : 'Choose Plan'}
                  </span>
                  {step < 3 && <div className="w-16 h-0.5 bg-muted ml-4" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Step 1: Property Details */}
          {formStep === 1 && (
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-2xl font-bold mb-6">Property Information</h2>
              
              {/* Listing Type */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-4 block">What do you want to do?</Label>
                <RadioGroup value={listingType} onValueChange={setListingType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Label htmlFor="sell" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="sell" id="sell" />
                    <div>
                      <div className="font-semibold">Sell Property</div>
                      <div className="text-sm text-muted-foreground">Find buyers for your property</div>
                    </div>
                  </Label>
                  <Label htmlFor="rent" className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="rent" id="rent" />
                    <div>
                      <div className="font-semibold">Rent Property</div>
                      <div className="text-sm text-muted-foreground">Find tenants for your property</div>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input 
                      id="title"
                      placeholder="e.g., Spacious 3BHK Apartment in Prime Location"
                      value={propertyDetails.title}
                      onChange={(e) => setPropertyDetails({...propertyDetails, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select value={propertyDetails.propertyType} onValueChange={(value) => setPropertyDetails({...propertyDetails, propertyType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="house">Independent House</SelectItem>
                        <SelectItem value="plot">Plot/Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Select value={propertyDetails.city} onValueChange={(value) => setPropertyDetails({...propertyDetails, city: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="locality">Locality *</Label>
                    <Input 
                      id="locality"
                      placeholder="e.g., Andheri West, Sector 47"
                      value={propertyDetails.locality}
                      onChange={(e) => setPropertyDetails({...propertyDetails, locality: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input 
                      id="price"
                      placeholder={listingType === 'rent' ? "e.g., 25000 (per month)" : "e.g., 8500000"}
                      value={propertyDetails.price}
                      onChange={(e) => setPropertyDetails({...propertyDetails, price: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="area">Area (sq ft) *</Label>
                    <Input 
                      id="area"
                      placeholder="e.g., 1200"
                      value={propertyDetails.area}
                      onChange={(e) => setPropertyDetails({...propertyDetails, area: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select value={propertyDetails.bedrooms} onValueChange={(value) => setPropertyDetails({...propertyDetails, bedrooms: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="BHK" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 BHK</SelectItem>
                          <SelectItem value="2">2 BHK</SelectItem>
                          <SelectItem value="3">3 BHK</SelectItem>
                          <SelectItem value="4">4 BHK</SelectItem>
                          <SelectItem value="5">5+ BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select value={propertyDetails.bathrooms} onValueChange={(value) => setPropertyDetails({...propertyDetails, bathrooms: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="address">Complete Address</Label>
                <Textarea 
                  id="address"
                  placeholder="Enter complete address with landmarks"
                  value={propertyDetails.address}
                  onChange={(e) => setPropertyDetails({...propertyDetails, address: e.target.value})}
                  className="mt-2"
                />
              </div>

              <div className="mt-6">
                <Label className="text-base font-semibold mb-4 block">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity) => (
                    <Label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox 
                        checked={propertyDetails.amenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPropertyDetails({
                              ...propertyDetails, 
                              amenities: [...propertyDetails.amenities, amenity]
                            });
                          } else {
                            setPropertyDetails({
                              ...propertyDetails,
                              amenities: propertyDetails.amenities.filter(a => a !== amenity)
                            });
                          }
                        }}
                      />
                      <span className="text-sm">{amenity}</span>
                    </Label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="description">Property Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your property in detail..."
                  value={propertyDetails.description}
                  onChange={(e) => setPropertyDetails({...propertyDetails, description: e.target.value})}
                  className="mt-2 h-32"
                />
              </div>

              <div className="flex justify-end mt-8">
                <Button onClick={handleNext} size="lg">
                  Next: Upload Media
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Upload Media */}
          {formStep === 2 && (
            <Card className="max-w-4xl mx-auto p-8">
              <h2 className="text-2xl font-bold mb-6">Upload Photos & Videos</h2>
              
              <div className="space-y-8">
                {/* Upload Stats */}
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{uploadedFiles.length}</div>
                      <div className="text-sm text-muted-foreground">Files Uploaded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {uploadedFiles.filter(f => f.status === 'success').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Successfully</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {uploadedFiles.filter(f => f.type === 'image').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Photos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {uploadedFiles.filter(f => f.type === 'video').length}
                      </div>
                      <div className="text-sm text-muted-foreground">Videos</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Max 20 files</div>
                    <div className="text-sm font-medium">
                      {uploadedFiles.length}/20
                    </div>
                  </div>
                </div>

                {/* Photo Upload Area */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Property Photos & Videos *</Label>
                  
                  {/* Drag & Drop Zone */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      isDragging 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted-foreground/25 hover:border-primary/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${
                      isDragging ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <h3 className="text-lg font-semibold mb-2">Upload Photos & Videos</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag & drop files here or click to browse. Supports JPG, PNG, WebP, MP4, AVI, MOV, WMV (max 10MB each)
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadedFiles.length >= 20}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => cameraInputRef.current?.click()}
                        disabled={uploadedFiles.length >= 20}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>

                    {/* Hidden file inputs */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraCapture}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Uploading...</h4>
                    {uploadedFiles.filter(f => f.status === 'uploading').map((file) => (
                      <div key={file.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium truncate">{file.file.name}</span>
                          <span className="text-sm text-muted-foreground">{file.progress}%</span>
                        </div>
                        <Progress value={file.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Uploaded Files Gallery */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-4">Uploaded Files ({uploadedFiles.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={file.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border bg-muted">
                            {file.type === 'image' ? (
                              <img
                                src={file.preview}
                                alt={file.file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted">
                                <Video className="w-8 h-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          
                          {/* File Info Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <div className="text-center text-white">
                              <p className="text-xs font-medium truncate px-2">{file.file.name}</p>
                              <p className="text-xs">{formatFileSize(file.size)}</p>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-2 left-2">
                            {file.status === 'uploading' && (
                              <Badge className="bg-blue-500 text-white text-xs">
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                Uploading
                              </Badge>
                            )}
                            {file.status === 'success' && (
                              <Badge className="bg-green-500 text-white text-xs">
                                <Check className="w-3 h-3 mr-1" />
                                Success
                              </Badge>
                            )}
                            {file.status === 'error' && (
                              <Badge className="bg-red-500 text-white text-xs">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Error
                              </Badge>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="flex space-x-1">
                              <Button
                                size="sm"
                                variant="secondary"
                                className="h-6 w-6 p-0"
                                onClick={() => removeFile(file.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Drag Handle */}
                          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <GripVertical className="w-4 h-4 text-white/70" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Upload Tips
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upload high-quality photos (minimum 800x600 pixels)</li>
                    <li>• Include photos of all rooms, kitchen, bathroom, and exterior</li>
                    <li>• First photo will be the cover image for your listing</li>
                    <li>• Videos should be under 2 minutes for better performance</li>
                    <li>• Supported formats: JPG, PNG, WebP, MP4, AVI, MOV, WMV</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={uploadedFiles.length === 0}
                >
                  Next: Choose Plan
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Subscription Plans */}
          {formStep === 3 && !createdProperty && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Choose Your Listing Plan</h2>
                <p className="text-lg text-muted-foreground">
                  Select a subscription that gives you full access to list and promote your property
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.name} className={`relative p-6 ${plan.color} ${plan.popular ? 'ring-2 ring-primary' : ''} ${plan.free ? 'ring-2 ring-green-500' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Crown className="w-4 h-4 mr-1" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    {plan.free && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          Free Forever
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                      <div className="text-muted-foreground">{plan.duration} validity</div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-success mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className="w-full" 
                      variant={plan.free ? "default" : plan.popular ? "default" : "outline"}
                      size="lg"
                      onClick={() => handlePlanSelection(plan.name)}
                      disabled={isCreatingListing}
                    >
                      {isCreatingListing && selectedPlan === plan.name ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating Listing...
                        </>
                      ) : plan.free ? (
                        'Start Free Listing'
                      ) : (
                        `Select ${plan.name}`
                      )}
                    </Button>
                  </Card>
                ))}
              </div>

              {/* Plan Benefits */}
              <Card className="p-6 bg-muted/30">
                <h3 className="text-xl font-bold mb-4 text-center">Why Choose Premium Plans?</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Higher Visibility</h4>
                    <p className="text-sm text-muted-foreground">Get priority placement in search results</p>
                  </div>
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">More Views</h4>
                    <p className="text-sm text-muted-foreground">Attract 3x more potential buyers</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Direct Contact</h4>
                    <p className="text-sm text-muted-foreground">Connect directly with verified buyers</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Expert Support</h4>
                    <p className="text-sm text-muted-foreground">Get dedicated assistance throughout</p>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center mt-8">
                <Button variant="outline" onClick={handlePrevious} className="mr-4">
                  Previous
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {createdProperty && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-green-600 mb-2">Listing Created Successfully!</h2>
                  <p className="text-lg text-muted-foreground">
                    Your property is now live and visible to potential buyers
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-muted-foreground">Title</p>
                      <p className="font-medium">{createdProperty.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{createdProperty.locality}, {createdProperty.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-medium">₹{createdProperty.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Plan Type</p>
                      <Badge className="capitalize">{createdProperty.plan_type}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expires On</p>
                      <p className="font-medium">{new Date(createdProperty.expires_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate('/buy')}
                      className="flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View My Listing
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </Button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      What happens next?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="font-medium">Get Views</p>
                        <p className="text-muted-foreground">Potential buyers will see your listing</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <p className="font-medium">Receive Leads</p>
                        <p className="text-muted-foreground">Get contacted by interested buyers</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Star className="w-4 h-4 text-purple-600" />
                        </div>
                        <p className="font-medium">Upgrade Anytime</p>
                        <p className="text-muted-foreground">Upgrade to get more visibility</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SellPage;