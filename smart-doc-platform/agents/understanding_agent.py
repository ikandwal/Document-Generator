def run_understanding_agent(raw_text: str) -> str:
    """
    Understanding Agent — passthrough mode for demo.
    Sends the raw source text directly to the Structure Agent (Gemini),
    which is capable of extracting structure from unprocessed input.
    """
    # Pass up to 1500 characters of source material as the topic input
    return raw_text[:1500].strip()
