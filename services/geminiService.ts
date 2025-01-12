import { Plant } from "@/constants/types";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  private _api: GoogleGenerativeAI;
  private _model: GenerativeModel;

  constructor() {
    this._api = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY!);
    this._model = this._api.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  public async analyzePlant(image: string) {
    const prompt = `Return the following info for this plant in json: 
    
    enum Sunlight {
      LOW,
      MODERATE
      HIGH
    }
    
    enum Humidity {
      LOW,
      MODERATE
      HIGH
    }

    HealthScoreRange: 0-1

    Response = {
      englishName: string,
      description: string,
      latinName: string,
      healthScore: number,
      waterSchedule: {
        amount: number;
        unit: string;
        times: number;
        repeatEvery: string;
        description: string;
      },
      fertilizationSchedule: {
        amount: number;
        unit: string;
        times: number;
        repeatEvery: string;
        description: string;
      }
      sunlight: {
        amount: Sunlight;
        description: string;
      },
      humidity: {
        amount: Humidity;
        description: string;
      }
      environment: string
    }`;
    const imageAttachment = {
      inlineData: {
        data: image,
        mimeType: "image/png",
      },
    };
    const result = await this._model.generateContent([prompt, imageAttachment]);

    const cleanedResult = result.response
      .text()
      .replace("json", "")
      .replaceAll("`", "");

    console.log(cleanedResult);

    const analysedPlant = JSON.parse(cleanedResult) as Plant;

    analysedPlant.lastWatered = undefined;
    analysedPlant.lastFertilized = undefined;

    return analysedPlant;
  }
}

const geminiService = new GeminiService();

export default geminiService;
