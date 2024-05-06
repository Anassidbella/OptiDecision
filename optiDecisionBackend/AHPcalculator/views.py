from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np

class CalculateWeightsView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.get('pairwiseComparisons', {})
        # Extracting all unique criteria names from the keys
        criteria_names = set()
        for key in data.keys():
            crit1, crit2 = key.split(' vs ')
            criteria_names.update([crit1, crit2])
        criteria_names = list(criteria_names)
        num_criteria = len(criteria_names)
        criteria_index = {name: i for i, name in enumerate(criteria_names)}

        # Initialize the comparison matrix
        comparisons = np.ones((num_criteria, num_criteria))  # Start with an identity matrix

        for key, value in data.items():
            crit1, crit2 = key.split(' vs ')
            if crit1 in criteria_index and crit2 in criteria_index:
                i, j = criteria_index[crit1], criteria_index[crit2]
                comparisons[i, j] = value
                comparisons[j, i] = 1 / value if value != 0 else np.inf  # Avoid division by zero
            else:
                # Log error or handle missing criteria
                print(f"Missing criteria: {crit1} or {crit2}")

        # Calculate weights using the AHP method
        weights = self.calculate_priority_weights(comparisons)
        response_data = {criteria_names[i]: weights[i] for i in range(num_criteria)}

        return Response(response_data, status=status.HTTP_200_OK)

    def calculate_priority_weights(self, comparisons):
        # Normalize the matrix and calculate the priority weights
        normalized_matrix = comparisons / comparisons.sum(axis=0)
        priority_weights = normalized_matrix.mean(axis=1)
        return priority_weights.tolist()


