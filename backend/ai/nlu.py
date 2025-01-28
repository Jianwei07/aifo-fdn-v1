from transformers import AutoModelForCausalLM, AutoTokenizer

class NLU:
    def __init__(self):
        self.model_name = "deepseek-ai/deepseek-small"  # Replace with actual model name
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForCausalLM.from_pretrained(self.model_name)

    def process_query(self, query):
        inputs = self.tokenizer(query, return_tensors="pt")
        outputs = self.model.generate(**inputs, max_length=50)
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)