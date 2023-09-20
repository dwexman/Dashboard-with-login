import React, { useEffect } from 'react';

const WIDGET_API_URL_BASE = 'https://onfire-widget01.azurewebsites.net/api/getwidget';

interface WidgetLoaderProps {
  widgetId: string;
}

export const WidgetLoader: React.FC<WidgetLoaderProps> = ({ widgetId }) => {
  useEffect(() => {
    // Construct the widget URL using the widgetId prop
    const WIDGET_CONTAINER_ID = `widget-container-${widgetId}`;
    const WIDGET_API_URL = `${WIDGET_API_URL_BASE}?container=${encodeURIComponent(WIDGET_CONTAINER_ID)}&user=${encodeURIComponent(widgetId)}`;
    
    fetch(WIDGET_API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(widgetCode => {
        // Create a new script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = widgetCode;

        // Append the script to the document's body
        document.body.appendChild(script);

        // Optional: Remove the script after execution to keep the DOM clean
        // return () => {
        //  document.body.removeChild(script);
        // };
      })
      .catch(error => {
        console.error('There was a problem fetching the widget code:', error);
      });
  }, [widgetId]); // Add widgetId as a dependency to the useEffect hook

  return (
    <>
      <div id={`widget-container-${widgetId}`}>
        <h1>Widget Loader</h1>
        <p>Loading widget...</p>
      </div>
    </>
  );
};
