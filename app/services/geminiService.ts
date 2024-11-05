import { Plant } from "@/constants/types";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { createContext } from "react";

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

    Response = {
      name: string,
      description: string,
      waterSchedule: {
        amount: number;
        unit: string;
        times: number;
        repeatEvery: string;
      },
      fertilizationSchedule: {
        amount: number;
        unit: string;
        times: number;
        repeatEvery: string;
      }
      sunlight: Sunlight,
      humidity: Humidity,
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
      .replaceAll("`", "")

    console.log(cleanedResult);

    const analysedPlant = JSON.parse(cleanedResult) as Plant;

    return analysedPlant;
  }
}

const geminiService = new GeminiService();

export default geminiService;
