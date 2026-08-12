def predict_crowd_and_wait(business_id: str):
    return {
        "business_id": business_id,
        "current_crowd": "Medium",
        "predicted_wait_minutes": 14,
        "confidence_score": 87,
        "entry_minutes": 3,
        "service_minutes": 10,
        "payment_minutes": 5,
        "best_time_to_visit": "02:00 PM",
        "recommendation_reason": "Lower predicted crowd density and minimal queue at entry & payment counters."
    }

def simulate_what_if(counters: int, staff: int, service_time_reduction: int):
    base_wait = 45
    reduction = min(32, (counters * 10) + (staff * 5) + (service_time_reduction * 3))
    predicted = max(8, base_wait - reduction)
    improvement = round(((base_wait - predicted) / base_wait) * 100)
    
    return {
        "current_wait_minutes": base_wait,
        "predicted_wait_minutes": predicted,
        "improvement_percent": improvement,
        "throughput_increase_percent": round(improvement * 1.2),
        "note": f"Adding {counters} counter(s) and {staff} staff member(s) reduces bottleneck delays significantly."
    }
