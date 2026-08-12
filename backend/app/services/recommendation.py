def generate_recommendation(prompt: str, budget: float = 2000.0, people: int = 4):
    movie_seats = ["B5", "B6", "B7", "B8"]
    movie_total = 280 * people
    dinner_est = 950
    parking_est = 60
    total_orig = movie_total + dinner_est + parking_est
    discount = 350
    final_est = total_orig - discount

    return {
        "id": "rec-combo-01",
        "destination_name": "City Mall",
        "destination_id": "b-city-mall",
        "movie_time": "7:30 PM",
        "movie_seats": movie_seats,
        "movie_price": movie_total,
        "restaurant_time": "9:15 PM",
        "restaurant_table": "T-04 (4-Seater)",
        "restaurant_price": dinner_est,
        "parking_slot": "P24",
        "parking_price": parking_est,
        "total_original_price": total_orig,
        "discount_amount": discount,
        "final_estimated_total": final_est,
        "expected_wait_minutes": 14,
        "score": 96,
        "explanation": "Dost picked City Mall because it combines your movie & dinner in one location, fits your budget with a ₹350 discount, and has a low 14-min predicted wait time."
    }
