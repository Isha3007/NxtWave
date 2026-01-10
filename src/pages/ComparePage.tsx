import { useState } from "react";
import { MainLayout } from "@/components/layout";
import { SchemeCard } from "@/components/schemes";
import { Scheme } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitCompare, 
  Plus, 
  X, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock schemes for comparison (in production, these would come from the API)
const mockSchemes: Scheme[] = [
    {
    id: 101,
    title: "Ayushman Bharat - PMJAY",
    category: "Healthcare",
    description: "Health insurance cover up to ₹5 lakh per family per year.",
    eligibility: "Families listed under SECC 2011",
    documents: ["Aadhaar Card", "Ration Card"],
    applyLink: "https://pmjay.gov.in",
    source: "Ministry of Health",
    whyRecommended: "Cashless treatment nationwide",
    confidence: 90,
  },
  {
    id: 102,
    title: "National Health Mission",
    category: "Healthcare",
    description: "Strengthening public healthcare infrastructure.",
    eligibility: "All citizens",
    documents: ["Aadhaar Card"],
    applyLink: "https://nhm.gov.in",
    source: "MoHFW",
    whyRecommended: "Improves rural & urban healthcare",
    confidence: 82,
  },
  {
    id: 103,
    title: "Janani Suraksha Yojana",
    category: "Healthcare",
    description: "Promotes institutional deliveries for women.",
    eligibility: "Pregnant women below poverty line",
    documents: ["Aadhaar Card", "BPL Card"],
    applyLink: "https://nhm.gov.in",
    source: "MoHFW",
    whyRecommended: "Safe childbirth incentives",
    confidence: 84,
  },
  {
    id: 104,
    title: "Rashtriya Bal Swasthya Karyakram",
    category: "Healthcare",
    description: "Child health screening and early intervention.",
    eligibility: "Children up to 18 years",
    documents: ["Birth Certificate"],
    applyLink: "https://nhm.gov.in",
    source: "MoHFW",
    whyRecommended: "Early disease detection",
    confidence: 80,
  },
  {
    id: 105,
    title: "PM National Dialysis Programme",
    category: "Healthcare",
    description: "Free dialysis services at district hospitals.",
    eligibility: "Patients with kidney failure",
    documents: ["Doctor Prescription", "Aadhaar"],
    applyLink: "https://nhm.gov.in",
    source: "MoHFW",
    whyRecommended: "Reduces dialysis cost burden",
    confidence: 78,
  },

  // ================= EDUCATION =================
  {
    id: 201,
    title: "National Scholarship Portal",
    category: "Education",
    description: "Central portal for government scholarships.",
    eligibility: "SC/ST/OBC/Minority/EWS students",
    documents: ["Aadhaar", "Income Certificate", "Marksheet"],
    applyLink: "https://scholarships.gov.in",
    source: "Ministry of Education",
    whyRecommended: "Multiple scholarships in one place",
    confidence: 88,
  },
  {
    id: 202,
    title: "Post Matric Scholarship",
    category: "Education",
    description: "Financial support for post-matric studies.",
    eligibility: "SC/ST/OBC students",
    documents: ["Caste Certificate", "Income Proof"],
    applyLink: "https://scholarships.gov.in",
    source: "MoE",
    whyRecommended: "Supports higher education",
    confidence: 85,
  },
  {
    id: 203,
    title: "Mid Day Meal Scheme",
    category: "Education",
    description: "Free meals for school children.",
    eligibility: "Government school students",
    documents: ["School ID"],
    applyLink: "https://education.gov.in",
    source: "MoE",
    whyRecommended: "Improves attendance & nutrition",
    confidence: 80,
  },
  {
    id: 204,
    title: "Samagra Shiksha Abhiyan",
    category: "Education",
    description: "Integrated school education programme.",
    eligibility: "School students",
    documents: ["School Records"],
    applyLink: "https://samagra.education.gov.in",
    source: "MoE",
    whyRecommended: "Holistic education support",
    confidence: 82,
  },
  {
    id: 205,
    title: "PM eVidya",
    category: "Education",
    description: "Digital education via TV, radio, and online.",
    eligibility: "All students",
    documents: ["None"],
    applyLink: "https://pmvidya.education.gov.in",
    source: "MoE",
    whyRecommended: "Remote learning access",
    confidence: 79,
  },

  // ================= AGRICULTURE =================
  {
    id: 301,
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description: "₹6000 annual income support to farmers.",
    eligibility: "Small & marginal farmers",
    documents: ["Land Records", "Aadhaar"],
    applyLink: "https://pmkisan.gov.in",
    source: "MoA",
    whyRecommended: "Direct income support",
    confidence: 85,
  },
  {
    id: 302,
    title: "PM Fasal Bima Yojana",
    category: "Agriculture",
    description: "Crop insurance against losses.",
    eligibility: "Farmers growing notified crops",
    documents: ["Land Records", "Bank Details"],
    applyLink: "https://pmfby.gov.in",
    source: "MoA",
    whyRecommended: "Protects against crop failure",
    confidence: 83,
  },
  {
    id: 303,
    title: "Soil Health Card Scheme",
    category: "Agriculture",
    description: "Soil nutrient assessment for farmers.",
    eligibility: "All farmers",
    documents: ["Land Details"],
    applyLink: "https://soilhealth.dac.gov.in",
    source: "MoA",
    whyRecommended: "Improves crop yield",
    confidence: 78,
  },
  {
    id: 304,
    title: "Kisan Credit Card",
    category: "Agriculture",
    description: "Affordable credit to farmers.",
    eligibility: "Farmers with landholding",
    documents: ["Aadhaar", "Land Records"],
    applyLink: "https://pmkisan.gov.in",
    source: "MoA",
    whyRecommended: "Easy farm loans",
    confidence: 82,
  },
  {
    id: 305,
    title: "National Agriculture Market (eNAM)",
    category: "Agriculture",
    description: "Online trading platform for crops.",
    eligibility: "Registered farmers",
    documents: ["Farmer Registration"],
    applyLink: "https://enam.gov.in",
    source: "MoA",
    whyRecommended: "Better price discovery",
    confidence: 77,
  },

  // ================= FINANCIAL INCLUSION =================
  {
    id: 401,
    title: "Pradhan Mantri Jan Dhan Yojana",
    category: "Financial Inclusion",
    description: "Zero-balance bank accounts.",
    eligibility: "All Indian citizens",
    documents: ["Aadhaar", "Photo"],
    applyLink: "https://pmjdy.gov.in",
    source: "MoF",
    whyRecommended: "Gateway to DBT benefits",
    confidence: 92,
  },
  {
    id: 402,
    title: "Atal Pension Yojana",
    category: "Financial Inclusion",
    description: "Guaranteed pension scheme.",
    eligibility: "18–40 years citizens",
    documents: ["Aadhaar", "Bank Account"],
    applyLink: "https://npscra.nsdl.co.in",
    source: "PFRDA",
    whyRecommended: "Old-age financial security",
    confidence: 85,
  },
  {
    id: 403,
    title: "Pradhan Mantri Mudra Yojana",
    category: "Financial Inclusion",
    description: "Loans for micro enterprises.",
    eligibility: "Small business owners",
    documents: ["Business Proof", "Aadhaar"],
    applyLink: "https://mudra.org.in",
    source: "MoF",
    whyRecommended: "Easy business credit",
    confidence: 88,
  },
  {
    id: 404,
    title: "Stand-Up India",
    category: "Financial Inclusion",
    description: "Loans for SC/ST and women entrepreneurs.",
    eligibility: "SC/ST/Women entrepreneurs",
    documents: ["Caste Certificate", "Business Plan"],
    applyLink: "https://standupmitra.in",
    source: "MoF",
    whyRecommended: "Promotes entrepreneurship",
    confidence: 84,
  },
  {
    id: 405,
    title: "Direct Benefit Transfer",
    category: "Financial Inclusion",
    description: "Direct transfer of subsidies to bank accounts.",
    eligibility: "Eligible beneficiaries",
    documents: ["Aadhaar", "Bank Account"],
    applyLink: "https://dbtbharat.gov.in",
    source: "GoI",
    whyRecommended: "Eliminates middlemen",
    confidence: 90,
  },

  // ================= HOUSING =================
  {
    id: 501,
    title: "Pradhan Mantri Awas Yojana - Urban",
    category: "Housing",
    description: "Affordable housing for urban poor.",
    eligibility: "EWS/LIG/MIG families",
    documents: ["Income Certificate", "Aadhaar"],
    applyLink: "https://pmaymis.gov.in",
    source: "MoHUA",
    whyRecommended: "Interest subsidy on loans",
    confidence: 87,
  },
  {
    id: 502,
    title: "Pradhan Mantri Awas Yojana - Gramin",
    category: "Housing",
    description: "Housing for rural poor.",
    eligibility: "Rural households",
    documents: ["Job Card", "Aadhaar"],
    applyLink: "https://pmayg.nic.in",
    source: "MoRD",
    whyRecommended: "Permanent rural housing",
    confidence: 85,
  },
  {
    id: 503,
    title: "Rajiv Awas Yojana",
    category: "Housing",
    description: "Slum redevelopment scheme.",
    eligibility: "Urban slum dwellers",
    documents: ["Residence Proof"],
    applyLink: "https://mohua.gov.in",
    source: "MoHUA",
    whyRecommended: "Slum-free cities",
    confidence: 76,
  },
  {
    id: 504,
    title: "Affordable Rental Housing Complex",
    category: "Housing",
    description: "Rental housing for migrants.",
    eligibility: "Urban migrants",
    documents: ["Employment Proof"],
    applyLink: "https://mohua.gov.in",
    source: "MoHUA",
    whyRecommended: "Affordable rentals",
    confidence: 79,
  },
  {
    id: 505,
    title: "Credit Linked Subsidy Scheme",
    category: "Housing",
    description: "Interest subsidy on housing loans.",
    eligibility: "EWS/LIG/MIG",
    documents: ["Income Certificate"],
    applyLink: "https://pmaymis.gov.in",
    source: "MoHUA",
    whyRecommended: "Lower EMI burden",
    confidence: 83,
  },

  // ================= EMPLOYMENT =================
  {
    id: 601,
    title: "Pradhan Mantri Kaushal Vikas Yojana",
    category: "Employment",
    description: "Skill development training for youth.",
    eligibility: "Unemployed youth",
    documents: ["Aadhaar"],
    applyLink: "https://pmkvyofficial.org",
    source: "MSDE",
    whyRecommended: "Industry-relevant skills",
    confidence: 84,
  },
  {
    id: 602,
    title: "MGNREGA",
    category: "Employment",
    description: "100 days guaranteed wage employment.",
    eligibility: "Rural households",
    documents: ["Job Card"],
    applyLink: "https://nrega.nic.in",
    source: "MoRD",
    whyRecommended: "Income security",
    confidence: 86,
  },
  {
    id: 603,
    title: "National Career Service",
    category: "Employment",
    description: "Job matching and career guidance.",
    eligibility: "Job seekers",
    documents: ["Resume"],
    applyLink: "https://www.ncs.gov.in",
    source: "MoLE",
    whyRecommended: "Employment opportunities",
    confidence: 78,
  },
  {
    id: 604,
    title: "Startup India",
    category: "Employment",
    description: "Support for startups.",
    eligibility: "Startup founders",
    documents: ["Incorporation Certificate"],
    applyLink: "https://startupindia.gov.in",
    source: "DPIIT",
    whyRecommended: "Entrepreneurship boost",
    confidence: 81,
  },
  {
    id: 605,
    title: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana",
    category: "Employment",
    description: "Skill training for rural youth.",
    eligibility: "Rural youth",
    documents: ["Aadhaar"],
    applyLink: "https://ddugky.gov.in",
    source: "MoRD",
    whyRecommended: "Rural employment",
    confidence: 80,
  },

  // ================= SOCIAL WELFARE =================
  {
    id: 701,
    title: "National Social Assistance Programme",
    category: "Social Welfare",
    description: "Pension for elderly, widows, disabled.",
    eligibility: "Below poverty line citizens",
    documents: ["BPL Card", "Aadhaar"],
    applyLink: "https://nsap.nic.in",
    source: "MoRD",
    whyRecommended: "Social security",
    confidence: 82,
  },
  {
    id: 702,
    title: "Integrated Child Development Services",
    category: "Social Welfare",
    description: "Nutrition and health for children & mothers.",
    eligibility: "Children & pregnant women",
    documents: ["Anganwadi Registration"],
    applyLink: "https://icds-wcd.nic.in",
    source: "MWCD",
    whyRecommended: "Child nutrition support",
    confidence: 81,
  },
  {
    id: 703,
    title: "PM Matru Vandana Yojana",
    category: "Social Welfare",
    description: "Maternity benefit scheme.",
    eligibility: "Pregnant women",
    documents: ["Aadhaar", "Bank Account"],
    applyLink: "https://pmmvy.nic.in",
    source: "MWCD",
    whyRecommended: "Maternal health support",
    confidence: 83,
  },
  {
    id: 704,
    title: "Senior Citizen Welfare Scheme",
    category: "Social Welfare",
    description: "Financial & healthcare support for elderly.",
    eligibility: "Senior citizens",
    documents: ["Age Proof"],
    applyLink: "https://socialjustice.gov.in",
    source: "MoSJE",
    whyRecommended: "Elder care support",
    confidence: 78,
  },
  {
    id: 705,
    title: "Disability Rehabilitation Scheme",
    category: "Social Welfare",
    description: "Rehabilitation services for disabled persons.",
    eligibility: "Persons with disabilities",
    documents: ["Disability Certificate"],
    applyLink: "https://socialjustice.gov.in",
    source: "MoSJE",
    whyRecommended: "Inclusive welfare",
    confidence: 80,
  },

];

export default function ComparePage() {
  const [selectedSchemes, setSelectedSchemes] = useState<Scheme[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectScheme = (scheme: Scheme) => {
    if (selectedSchemes.find(s => s.id === scheme.id)) {
      setSelectedSchemes(selectedSchemes.filter(s => s.id !== scheme.id));
    } else if (selectedSchemes.length < 3) {
      setSelectedSchemes([...selectedSchemes, scheme]);
    }
  };

  const removeScheme = (schemeId: number) => {
    setSelectedSchemes(selectedSchemes.filter(s => s.id !== schemeId));
  };

  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="gov-badge mb-4">
            <GitCompare className="h-3 w-3" />
            Side-by-Side Comparison
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Compare Schemes
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select up to 3 schemes to compare their eligibility, benefits, and requirements side by side.
          </p>
        </div>

        {/* Selection Area */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {selectedSchemes.map((scheme) => (
              <Badge
                key={scheme.id}
                variant="secondary"
                className="pl-3 pr-1 py-2 text-sm flex items-center gap-2"
              >
                {scheme.title}
                <button
                  onClick={() => removeScheme(scheme.id)}
                  className="h-5 w-5 rounded-full bg-muted hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {selectedSchemes.length < 3 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSelector(!showSelector)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Scheme
              </Button>
            )}
          </div>
        </div>

        {/* Scheme Selector */}
        {showSelector && (
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">Select Schemes to Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {mockSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onSelect={handleSelectScheme}
                    isSelected={selectedSchemes.some(s => s.id === scheme.id)}
                    showSelectButton
                  />
                ))}
              </div>
              <div className="text-center mt-4">
                <Link to="/profile">
                  <Button variant="link">
                    Get personalized recommendations first
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {selectedSchemes.length >= 2 && (
          <div className="animate-fade-in">
            <Card className="overflow-hidden">
              <CardHeader className="bg-subtle-gradient">
                <CardTitle className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-primary" />
                  Comparison Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold bg-muted/50 min-w-[150px]">
                          Criteria
                        </th>
                        {selectedSchemes.map((scheme) => (
                          <th
                            key={scheme.id}
                            className="text-left p-4 font-semibold min-w-[250px]"
                          >
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {scheme.category}
                              </Badge>
                            </div>
                            <p className="mt-1">{scheme.title}</p>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Confidence Score */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Match Score
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden max-w-[100px]">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${scheme.confidence}%` }}
                                />
                              </div>
                              <span className="font-semibold text-primary">
                                {scheme.confidence}%
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Eligibility */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success" />
                            Eligibility
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4 text-sm">
                            {scheme.eligibility}
                          </td>
                        ))}
                      </tr>

                      {/* Why Recommended */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-warning" />
                            Why Recommended
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4 text-sm">
                            {scheme.whyRecommended}
                          </td>
                        ))}
                      </tr>

                      {/* Documents */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            Required Documents
                          </div>
                        </td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4">
                            <ul className="text-sm space-y-1">
                              {scheme.documents.map((doc, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>

                      {/* Source */}
                      <tr className="border-b border-border">
                        <td className="p-4 font-medium bg-muted/50">Source</td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4 text-sm text-muted-foreground">
                            {scheme.source}
                          </td>
                        ))}
                      </tr>

                      {/* Apply Links */}
                      <tr>
                        <td className="p-4 font-medium bg-muted/50">Apply</td>
                        {selectedSchemes.map((scheme) => (
                          <td key={scheme.id} className="p-4">
                            <Button
                              variant="gradient"
                              size="sm"
                              onClick={() => window.open(scheme.applyLink, "_blank")}
                            >
                              Apply Now
                            </Button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {selectedSchemes.length < 2 && !showSelector && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mb-4">
                <GitCompare className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                Select Schemes to Compare
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-4">
                Choose at least 2 schemes (up to 3) to see a detailed side-by-side comparison.
              </p>
              <Button variant="gradient" onClick={() => setShowSelector(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Schemes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
