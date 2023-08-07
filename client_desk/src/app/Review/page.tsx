"use client"
import axios from "axios";
import { useState ,useEffect  } from "react";
import * as React from 'react';



document.addEventListener("DOMContentLoaded", () => {
    const openReviewFormButton = document.getElementById("openReviewForm");
    const reviewForm = document.getElementById("reviewForm");
    const submitReviewButton = document.getElementById("submitReview");
    const submittedReview = document.getElementById("submittedReview");
    const reviewContent = document.getElementById("reviewContent") as HTMLParagraphElement;
    const reviewText = document.getElementById("reviewText") as HTMLTextAreaElement;
  
    openReviewFormButton?.addEventListener("click", () => {
      reviewForm.style.display = "block";
      openReviewFormButton.style.display = "none";
    });
  
    submitReviewButton?.addEventListener("click", () => {
      const userReview = reviewText.value;
      if (userReview) {
        reviewForm.style.display = "none";
        submittedReview.style.display = "block";
        reviewContent.textContent = userReview;
      }
    });
  });
  