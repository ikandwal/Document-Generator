import os
from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

# Try loading fine-tuned model first, fallback to base google/flan-t5-small
MODEL_PATH = "./flan-t5-doc-model"
BASE_MODEL = "google/flan-t5-small"

try:
    if os.path.exists(MODEL_PATH):
        tokenizer = T5Tokenizer.from_pretrained(MODEL_PATH)
        model = T5ForConditionalGeneration.from_pretrained(MODEL_PATH)
    else:
        tokenizer = T5Tokenizer.from_pretrained(BASE_MODEL)
        model = T5ForConditionalGeneration.from_pretrained(BASE_MODEL)
    model.eval()  # Set to inference mode
except Exception as e:
    print(f"Warning: Failed to load FLAN-T5 model. Ensure transformers is correctly installed. Error: {e}")
    tokenizer = None
    model = None

def run_understanding_agent(raw_text: str) -> str:
    """
    Runs locally on CPU using fine-tuned FLAN-T5 Small (or base model).
    Extracts key topics from raw unstructured text.
    No internet required.
    """
    if model is None or tokenizer is None:
        return "Error: Local model Not loaded."
        
    prompt = f"extract key topics: {raw_text}"
    
    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        max_length=512,
        truncation=True
    )
    
    with torch.no_grad():
        outputs = model.generate(
            inputs["input_ids"],
            max_length=128,
            num_beams=4,
            early_stopping=True
        )
    
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return result
